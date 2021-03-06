var gl;
var m4;
var lightWorldPosition;
var lightColor ;
var camera;
var view;
var viewProjection;
var shapes ;
var programInfo;
var baseHue;
var textEsfera;
var objects = [];
var drawObjects = [];
var requestId;
var positions=[];
var pendingTransformation = [ ];
var texturas=[];
var eye=[1, 4, -20];
function rand(min, max) {
  return min + Math.random() * (max - min);
}

function render(time) {
   var windowWidth = window.innerWidth - 20;
   var windowHeight = window.innerHeight - 40;
   gl.canvas.width=windowWidth;
   gl.canvas.height=windowHeight;
   
  time *= 0.003;
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var blending = document.getElementById("transparente").checked;
        if (blending) {
            
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
            gl.uniform1f(programInfo.alphaUniform, 29837829.0);
        } else {
            gl.disable(gl.BLEND);
            gl.enable(gl.DEPTH_TEST);
        }
  

  var projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.5, 100);
 // eye = [1, 4, -20];
   //var eye = [1,4, 20];
 
  var target = [0, 0, 0];
  var up = [0, 1, 0];

  m4.lookAt(eye, target, up, camera);
  m4.inverse(camera, view);
  m4.multiply(view, projection, viewProjection);
    drawPlano(time);
//    drawEsfera(time);
  //  drawCubo();
    drawFiguraPorIndice(time, 1);
    drawFiguraPorIndice(time, 2);
    drawFiguraPorIndice(time, 3);
  
    drawFiguraPorIndice(time, 4);


  twgl.drawObjectList(gl, drawObjects);

requestId= requestAnimationFrame(render);

}


function iniciar(){
 "use strict";
    twgl.setAttributePrefix("a_");
     m4 = twgl.m4;
     gl = twgl.getWebGLContext(document.getElementById("c"));
    programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

    shapes = [
      twgl.primitives.createPlaneBufferInfo(gl, 30, 30, 10, 10), //width, height, subdivision
      twgl.primitives.createCylinderBufferInfo(gl, 0.3, 20, 24, 2),
      twgl.primitives.createCubeBufferInfo(gl, 2),
      twgl.primitives.createSphereBufferInfo(gl, 1, 24, 12),
      //twgl.primitives.createTruncatedConeBufferInfo(gl, 1, 0, 2, 24, 1),
      //twgl.primitives.createCresentBufferInfo(gl, 1, 1, 0.5, 0.1, 24),
      //twgl.primitives.createDiscBufferInfo(gl, 1, 24),
      twgl.primitives.createTorusBufferInfo(gl, 1, 0.4, 24, 12),
    ];


        lightWorldPosition = [1, 8, -10];
     lightColor = [1, 1, 1, 1];
     camera = m4.identity();
     view = m4.identity();
     viewProjection = m4.identity();
/*
    textEsfera = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: [
        255, 255, 255, 255,
        192, 192, 192, 255,
        192, 192, 192, 255,
        255, 255, 255, 255,
      ],
    });
*/
    var numObjects = shapes.length;
    baseHue = rand(0, 360); //color que se usara
    /*posiciones iniciales*/
    positions[0]=[0,0,0];//plano
    positions[1]=[0,0,0];//cilindro
    positions[2]=[5,1,-2];//cubo
    positions[3]=[-2,3.5,-4];//esfera
    positions[4]=[2,0.5,2];//torus

       texturas[0] = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/ajedrez.jpg",
    });

     texturas[1] = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/metal.jpg",
    });
      texturas[2] = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/madera.jpg",
    });


      texturas[3] = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/baseball.jpg",
    });

      texturas[4] = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/rosado.jpg",
    });

 settingsFiguraPorIndice(0);
  settingsFiguraPorIndice(1);
  settingsFiguraPorIndice(2);
  settingsFiguraPorIndice(3);
  
  settingsFiguraPorIndice(4);
    requestAnimationFrame(render);
    //render();

}


function cancelarAnimation(){

if(requestId){
  cancelAnimationFrame(requestId);
  requestId=undefined;
}

}

/*function settingsPlano(){

 var initial_position=[0,0,0];//esfera
    texturas[0] = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/ajedrez.jpg",
    });

     texturas[1] = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/concreto.jpg",
    });

var uniforms = {
        u_lightWorldPos: lightWorldPosition,
        u_lightColor: lightColor,
       u_diffuseMult: [1,1,1,1],
        u_specular: [1, 1, 1, 1],
        u_shininess: 50,
        u_specularFactor: 1,
        u_diffuse: textEsfera,
        u_viewInverse: camera,
        u_world: m4.identity(),
        u_worldInverseTranspose: m4.identity(),
        u_worldViewProjection: m4.identity(),
      };


     objects[0]={
         translation: initial_position,
        ySpeed: rand(0.1, 0.3),
        zSpeed: rand(0.1, 0.3),
        uniforms: uniforms,
      };

  
}

*/function settingsFiguraPorIndice(i){

    initial_position=positions[i];//esfera
    // textEsfera = twgl.createTexture(gl, {
    //   min: gl.NEAREST,
    //   mag: gl.NEAREST,
    //   src: "textura/ajedrez.jpg",
    // });
    var uniforms = {
        u_lightWorldPos: lightWorldPosition,
        u_lightColor: lightColor,
       u_diffuseMult: [1,1,1,1],
        u_specular: [1, 1, 1, 1],
        u_shininess: 50,
        u_specularFactor: 1,
        u_diffuse: texturas[i],
        u_viewInverse: camera,
        u_world: m4.identity(),
        u_worldInverseTranspose: m4.identity(),
        u_worldViewProjection: m4.identity(),
   };
/* aqui lo que vle es esto
  var uniforms = {
        u_lightWorldPos: lightWorldPosition,
        u_lightColor: lightColor,
       u_diffuseMult: [1,1,1,1],
        u_specular: [1, 1, 1, 1],
        u_shininess: 50,
        u_specularFactor: 1,
        u_diffuse: texturas[i],
        u_viewInverse: camera,
        u_world: m4.identity(),
        u_worldInverseTranspose: m4.identity(),
        u_worldViewProjection: m4.identity(),
   };
   */


   objects[i]={
     translation: initial_position,
     rad_pos: initial_position,
     actual_pos:initial_position,
     rad_size: 1,
    ySpeed: rand(0.1, 0.3),
    zSpeed: rand(0.1, 0.3),
    uniforms: uniforms,
   };

     pendingTransformation[i] = m4.identity();

  
}

function drawPlano(time){
  
    uniforms=objects[0].uniforms;
    drawObjects[0]={
        programInfo: programInfo,
        bufferInfo: shapes[0],
        uniforms: uniforms,
    };

    var obj=objects[0];

    var uni = obj.uniforms;
    var world = uni.u_world;
    m4.identity(world);
    if($("#animBox").is(":checked")){
           // m4.rotateY(world, time * obj.zSpeed, world);
        }
    //m4.rotateY(world, time * obj.ySpeed, world);
    //m4.rotateZ(world, time * obj.zSpeed, world);
    m4.translate(world, obj.translation, world);
    //m4.rotateX(world, time, world);
  //  m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
    m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);

   
   }


function drawFiguraPorIndice(time,i){
  

uniforms=objects[i].uniforms;
   drawObjects[i]={
        programInfo: programInfo,
        bufferInfo: shapes[i],
        uniforms: uniforms,
      };

        var obj=objects[i];
        var uni = obj.uniforms;
        var world = uni.u_world;
        m4.identity(world);
        
        //aplicar transformacion
        if($("#animBox").is(":checked")){
          if(i>1)
            m4.rotateY(world, time * obj.zSpeed, world);
        } else {
            var transf = pendingTransformation[i];
            if(transf)
            m4.multiply(world, transf, world);
        }
                //m4.rotateZ(world, time * obj.zSpeed, world);
        console.log(i + " " + obj.actual_pos[0]);
        m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
        //m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);
   
   
   }

function aplicarTransformacion(i, mat){
    pendingTransformation[i] = m4.multiply(pendingTransformation[i] , mat );
  objects[i].actual_pos=m4.transformPoint(mat,objects[i].actual_pos);
}


 function trasladarFiguraEnX(i, x){
         obj=objects[i];
         obj.translation=[x,obj.translation[1],obj.translation[2]];
 }
 
 function trasladarFiguraEnY(i, y){
         obj=objects[i];
         obj.translation=[obj.translation[0],y,obj.translation[2]];
 }
 
 
 function trasladarFiguraEnZ(i, z){
         obj=objects[i];
         obj.translation=[obj.translation[0],obj.translation[1],z];
 }

 function detectCollision(mat, vec, rad, index){
     var transformed = m4.transformPoint(mat, vec);
     //colision con cilindro
     if (Math.abs(transformed[0]) < 0.3 + rad  &&
            Math.abs(transformed[2]) < 0.3 + rad ){
         console.log("cilindro crash");
         return true;
     }
    //colision con plano
     if (Math.abs(transformed[1]) < rad){
         console.log("plano  crash");
         return true;
     }

     var i, j;
     for( i=2; i < 5; i++){
         if(i != index){
             var figura = objects[i].actual_pos;
             //console.log(transformed);
             //console.log(figura);
             for(j = 0; j < 3; j++){
                 if(Math.abs(transformed[0] - figura[0]) < 2 * rad &&
                     Math.abs(transformed[1] - figura[1]) < 2 * rad &&
                     Math.abs(transformed[2] - figura[2]) < 2 * rad ){
                    console.log("figura crash");
                    return true;
                 }
             }
         }
     }
     
     return false;
 }

 function isDebajoDelPlano(mat, vec, rad, index){
      var transformed = m4.transformPoint(mat, vec);
      if (Math.abs(transformed[1]) < rad+0.05){
         console.log("plano  crash");
         return true;
     }
     return false;
 }

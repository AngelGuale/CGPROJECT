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

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function render(time) {
   var windowWidth = window.innerWidth - 20;
   var windowHeight = window.innerHeight - 40;
   gl.canvas.width=windowWidth;
   gl.canvas.height=windowHeight;
   
  time *= 0.001;
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.5, 100);
  var eye = [-1, 4, -20];
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
    positions[2]=[2,1,1];//cubo
    positions[3]=[-2,1,0];//esfera
    positions[4]=[3,2,-1];//torus

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


/*

     for (var ii = 0; ii < numObjects; ++ii) {
      var uniforms = {
        u_lightWorldPos: lightWorldPosition,
        u_lightColor: lightColor,
        u_diffuseMult: chroma.hsv((baseHue + rand(0, 60)) % 360, 0.4, 0.8).gl(),
        u_specular: [1, 1, 1, 1],
        u_shininess: 50,
        u_specularFactor: 1,
        u_diffuse: textEsfera,
        u_viewInverse: camera,
        u_world: m4.identity(),
        u_worldInverseTranspose: m4.identity(),
        u_worldViewProjection: m4.identity(),
      };
      drawObjects.push({
        programInfo: programInfo,
        bufferInfo: shapes[ii],
        uniforms: uniforms,
      });

     objects.push({
         translation: initial_positions[ii],
        ySpeed: rand(0.1, 0.3),
        zSpeed: rand(0.1, 0.3),
        uniforms: uniforms,
      });
    

}
*/
  //settingsEsfera();
  //settingsPlano();
  //settingsCubo();
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

function settingsPlano(){

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

function settingsFiguraPorIndice(i){

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


   objects[i]={
     translation: initial_position,
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
        var transf = pendingTransformation[i];
        if(transf)
            m4.multiply(world, transf, world);

        //m4.rotateZ(world, time * obj.zSpeed, world);
        //console.log("aqui");
      //          console.log(i);
        //console.log(obj.translation);
        m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
        //m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);
   
   
   }

function aplicarTransformacion(i, mat){
    pendingTransformation[i] = m4.multiply(pendingTransformation[i] , mat );
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
 
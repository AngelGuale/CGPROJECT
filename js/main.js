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

/*
 "use strict";
    twgl.setAttributePrefix("a_");
    var m4 = twgl.m4;
    var gl = twgl.getWebGLContext(document.getElementById("c"));
    var programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

    var shapes = [
      twgl.primitives.createPlaneBufferInfo(gl, 20, 20, 100, 100), //width, height, subdivision
      twgl.primitives.createCylinderBufferInfo(gl, 0.3, 20, 24, 2),
      twgl.primitives.createCubeBufferInfo(gl, 2),
      twgl.primitives.createSphereBufferInfo(gl, 1, 24, 12),
      //twgl.primitives.createTruncatedConeBufferInfo(gl, 1, 0, 2, 24, 1),
      //twgl.primitives.createCresentBufferInfo(gl, 1, 1, 0.5, 0.1, 24),
      //twgl.primitives.createDiscBufferInfo(gl, 1, 24),
      twgl.primitives.createTorusBufferInfo(gl, 1, 0.4, 24, 12),
    ];
*/
    function rand(min, max) {
      return min + Math.random() * (max - min);
    }
/*
    // Shared values
    var lightWorldPosition = [1, 8, -10];
    var lightColor = [1, 1, 1, 1];
    var camera = m4.identity();
    var view = m4.identity();
    var viewProjection = m4.identity();

    var tex = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: [
        255, 255, 255, 255,
        192, 192, 192, 255,
        192, 192, 192, 255,
        255, 255, 255, 255,
      ],
    });

    var objects = [];
    var drawObjects = [];
    //var numObjects = 100;
    var numObjects = shapes.length;
    var baseHue = rand(0, 360); //color que se usara
  
*/
    /*posiciones iniciales*/
  /*
    var initial_positions=[];
    initial_positions[0]=[0,0,0];//plano
    initial_positions[1]=[0,0,0];//cilindro
    initial_positions[2]=[2,1,1];//cubo
    initial_positions[3]=[-2,1,0];//esfera
    initial_positions[4]=[3,2,-1];//torus

     for (var ii = 0; ii < numObjects; ++ii) {
      var uniforms = {
        u_lightWorldPos: lightWorldPosition,
        u_lightColor: lightColor,
        u_diffuseMult: chroma.hsv((baseHue + rand(0, 60)) % 360, 0.4, 0.8).gl(),
        u_specular: [1, 1, 1, 1],
        u_shininess: 50,
        u_specularFactor: 1,
        u_diffuse: tex,
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
       // translation: [rand(-10, 10), rand(-10, 10), rand(-10, 10)],
         translation: initial_positions[ii],
        ySpeed: rand(0.1, 0.3),
        zSpeed: rand(0.1, 0.3),
        uniforms: uniforms,
      });
    }

*/
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
 /*     
      objects.forEach(function(obj) {
        var uni = obj.uniforms;
        var world = uni.u_world;
        m4.identity(world);
        m4.rotateY(world, time * obj.ySpeed, world);
        //m4.rotateZ(world, time * obj.zSpeed, world);
        m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
      //  m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);
      });
      
  */
  /*
      for (var i=0;i<objects.length;i++){
        var obj=objects[i];
          var uni = obj.uniforms;
        var world = uni.u_world;
        m4.identity(world);
        if(i!=0){//para que el plano no rote
        
        m4.rotateY(world, time * obj.ySpeed, world);
        //m4.rotateZ(world, time * obj.zSpeed, world);
        m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
        }
       m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);

  }
*/
drawPlano(time);
drawEsfera(time);

      twgl.drawObjectList(gl, drawObjects);
  
      
      
    requestId= requestAnimationFrame(render);

    }


/*
    requestAnimationFrame(render);
*/

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
    var initial_positions=[];
    initial_positions[0]=[0,0,0];//plano
    initial_positions[1]=[0,0,0];//cilindro
    initial_positions[2]=[2,1,1];//cubo
    initial_positions[3]=[-2,1,0];//esfera
    initial_positions[4]=[3,2,-1];//torus

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
settingsEsfera();
settingsPlano();
    requestAnimationFrame(render);
    //render();

}

function rotarAlrededor(time){
      time *= 0.0005;
      twgl.resizeCanvasToDisplaySize(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      gl.enable(gl.DEPTH_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      var projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.5, 100);
      var eye = [1, 4, -20];
      var target = [0, 0, 0];
      var up = [0, 1, 0];

      m4.lookAt(eye, target, up, camera);
      m4.inverse(camera, view);
      m4.multiply(view, projection, viewProjection);
      

  console.log("rotartodo");
      for (var i=0;i<objects.length;i++){
        var obj=objects[i];
        var uni = obj.uniforms;
        var world = uni.u_world;
        m4.identity(world);
        if(i!=0){//para que el plano no rote
        
        m4.rotateY(world, time * obj.ySpeed, world);
        //m4.rotateZ(world, time * obj.zSpeed, world);
      //  m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
        }
       m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);

  }


      twgl.drawObjectList(gl, drawObjects);
      
    requestId= requestAnimationFrame(rotarAlrededor);



}



function cancelarAnimation(){

if(requestId){
  cancelAnimationFrame(requestId);
  requestId=undefined;
}

}


function settingsEsfera(){

 var initial_position=[-2,1,0];//esfera
    textEsfera = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/baseball.jpg",
    });
    console.log(chroma.hsv((baseHue + rand(0, 60)) % 360, 0.4, 0.8).gl());

var uniforms = {
        u_lightWorldPos: lightWorldPosition,
        u_lightColor: lightColor,

     //   u_diffuseMult: chroma.hsv((baseHue + rand(0, 60)) % 360, 0.4, 0.8).gl(),
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


     objects[3]={
         translation: initial_position,
        ySpeed: rand(0.1, 0.3),
        zSpeed: rand(0.1, 0.3),
        uniforms: uniforms,
      };

  
}


function settingsPlano(){

 var initial_position=[0,0,0];//esfera
    textEsfera = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: "textura/ajedrez.jpg",
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


function drawEsfera(time){
  

uniforms=objects[3].uniforms;
   drawObjects[3]={
        programInfo: programInfo,
        bufferInfo: shapes[3],
        uniforms: uniforms,
      };

        var obj=objects[3];

        var uni = obj.uniforms;
        var world = uni.u_world;
        m4.identity(world);
        m4.rotateY(world, time * obj.ySpeed, world);
        //m4.rotateZ(world, time * obj.zSpeed, world);
        m4.translate(world, obj.translation, world);
        //m4.rotateX(world, time, world);
      //  m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
        m4.multiply(uni.u_world, viewProjection, uni.u_worldViewProjection);
   
   
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
function Renderer(canvas){
    this.initGL(canvas);
}

Renderer.prototype.initGL = function(canvas){
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");

    if (!this.gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }else{
        console.log("WebGL context successfully loaded");
    }
}

Renderer.prototype.initShaderProgram = function(vsSource, fsSource){
    const vertexShader = loadShader(this.gl, this.gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(this.gl, this.gl.FRAGMENT_SHADER, fsSource);
  
    // Create the shader program
  
    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);
  
    // If creating the shader program failed, alert
  
    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(this.shaderProgram));
        this.shaderProgram = null;
    }
}

Renderer.prototype.loadShader = function(type, source) {
    const shader = this.gl.createShader(type);
  
    // Send the source to the shader object
    this.gl.shaderSource(shader, source);
  
    // Compile the shader program
    this.gl.compileShader(shader);
  
    // See if it compiled successfully
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        return null;
    }
  
    return shader;
  }

Renderer.prototype.update = function(){
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
}
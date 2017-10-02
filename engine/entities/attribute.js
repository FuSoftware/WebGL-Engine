function Attribute(entity){
    this.vbo = 0;
    this.data = [];
    this.data_count = 0;
    this.data_type = 0;
    this.buffer_type = 0;

    this.attrib_index = -1;

    this.parent = entity;
    this.gl = this.parent.gl;
}

Attribute.prototype.init = function(buffer_type, data_type, data, data_count, drawing_type){
    this.vbo = this.gl.createBuffer();
    this.gl.bindBuffer(buffer_type, this.vbo);
    this.gl.bufferData(buffer_type, data, drawing_type);

    this.data_count = data_count;
    this.data_type = data_type;
    this.buffer_type = buffer_type;
}

Attribute.prototype.setLocation = function(location){
    this.attrib_index = location;
}

Attribute.prototype.setAttribIndex = function(index){
    this.attrib_index = index;
}

Attribute.prototype.bind = function(){
    this.gl.bindBuffer(this.buffer_type, this.vbo);

    this.gl.vertexAttribPointer(
        this.attrib_index,
        this.data_count,
        this.data_type,
        false,
        0,
        0
    );

    this.gl.enableVertexAttribArray(this.attrib_index);
}
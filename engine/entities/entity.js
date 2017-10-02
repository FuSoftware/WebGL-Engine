function Entity(args){

    this.parent = null;
    this.gl = null;

    if(args['parent']){
        this.parent = args['parent'];
        this.gl = this.parent.gl;
    }else if(args['gl']){
        this.gl = args['gl'];
    }

    this.position = [0,0,0];
    this.rotation = [0,0,0];
    this.scale = [0,0,0];

    this.attributes = {};
    this.attribute_names = [];

    this.children = [];

    this.MV = mat4.create();
}

Entity.prototype.addAttribute = function(name, location, data_type, data, data_count){
    var attr = new Attribute(this);
    attr.setLocation(location);
    attr.init(this.gl.ARRAY_BUFFER, data_type, data, data_count, this.gl.STATIC_DRAW)

    this.attributes[name] = attr;
    this.attribute_names[this.attribute_names.length] = name;
}

Entity.prototype.updateMVP = function(){
    if(this.parent != null){
        this.MV = mat4.clone(this.parent.MV);
    }else{
        mat4.identity(this.MV);
    }

    //Scaling
    mat4.scale(this.MV, this.MV, this.scale);

    //Rotation
    mat4.rotateX(this.MV, this.MV, this.rotation[0]);
    mat4.rotateY(this.MV, this.MV, this.rotation[1]);
    mat4.rotateZ(this.MV, this.MV, this.rotation[2]);

    //Translation
    mat4.translate(this.MV, this.MV, this.position);
}

Entity.prototype.draw = function(){
    for(var i=0;i<this.attribute_names.length;i++){
        this.bindAttribute(this.attribute_names[i]);
    }

    var vertexAttr = this.attributes['vertex'];

    this.gl.drawArrays(this.gl.TRIANGLES, 0, vertexAttr.data_count);
}

Entity.prototype.bindAttribute = function(name){
    this.attributes[name].bind();
}
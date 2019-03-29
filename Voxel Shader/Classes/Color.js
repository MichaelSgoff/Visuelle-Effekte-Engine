import Material from './Material.js';

class Color extends Material{
    constructor(shader, ambient, diffuse, specular, shininess, v0, v1, v2, v3)
    {
        super(shader, ambient, diffuse, specular, shininess);
        this.v0 = v0; 
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }

    bind()
    {
        super.bind();
        
        if(!this.v3)
        {
            this.shader.setUniform3f("uColor", this.v0, this.v1, this.v2);
        }
        else
        {
            this.shader.setUniform4f("uColor", this.v0, this.v1, this.v2, this.v3);
        }
    }

}

export default Color
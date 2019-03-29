import Material from './Material.js';

class Color extends Material{
    constructor(shader, ambient, diffuse, specular, shininess, r, g, b, v)
    {
        super(shader, ambient, diffuse, specular, shininess);
        this.r = r; 
        this.g = g;
        this.b = b;
        this.v = v;
    }

    bind()
    {
        super.bind();
        
        if(!this.v)
        {
            this.shader.setUniform3f("uColor", this.r, this.g, this.b);
        }
        else
        {
            this.shader.setUniform4f("uColor", this.r, this.g, this.b, this.v);
        }
    }

}

export default Color
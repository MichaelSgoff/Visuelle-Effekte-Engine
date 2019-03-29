import GL from "./GL.js";
import Light from "./Light.js";

class PointLight extends Light {
    constructor(colorUniform, ambient, diffuse, specular, constant, linear, quadratic, position, color = [1.0, 1.0, 1.0])
    {
        super(colorUniform, ambient, diffuse, specular, position, color)
        this.constant = constant;
        this.linear = linear;
        this.quadratic = quadratic;
        this.type = "p";
        this.gl = GL.getGL();
    }

    bind(shader)
    {
        super.bind(shader)
        shader.setUniform1f(this.colorUniform + ".constant", this.constant);
        shader.setUniform1f(this.colorUniform + ".linear", this.linear);
        shader.setUniform1f(this.colorUniform + ".quadratic", this.quadratic);
    }
}

export default PointLight
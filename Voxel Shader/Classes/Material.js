import GL from "./GL.js";
class Material
{
    constructor(shader, ambient, diffuse, specular, shininess)
    {
        this.gl = GL.getGL();
        this.shader = shader;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.shininess = shininess;
    }

    bind()
    {
        this.shader.bind();
        this.shader.setUniform3f("material.ambient", this.ambient[0], this.ambient[1], this.ambient[2]);
        this.shader.setUniform3f("material.diffuse", this.diffuse[0], this.diffuse[1], this.diffuse[2]);
        this.shader.setUniform3f("material.specular", this.specular[0], this.specular[1], this.specular[2]);
        this.shader.setUniform1f("material.shininess", this.shininess);
    }
}
export default Material
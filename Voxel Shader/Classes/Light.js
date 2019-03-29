import GL from "./GL.js";
import Shader from "./Shader.js";
import Color from "./Color.js";
import Cube from "./Cube.js";

const vsSourceString =
    `
    struct Material
    {
        vec3 ambient;
        vec3 diffuse;
        vec3 specular;
        float shininess;
    };
    uniform Material material;
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    varying vec3 vNormal;
    varying vec3 vAmbient;
    uniform mat4 uTransform;
    void main() { 
        vNormal = aNormal;
        vAmbient = material.ambient;
        gl_PointSize = 10.0;
        gl_Position = uTransform * vec4(aPosition, 1.0);
    }`;

const fsSourceString =
    `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    uniform vec3 uColor;
    void main() {
        gl_FragColor = vec4(uColor, 1.0);
    }`;

class Light {
    constructor(colorUniform, ambient, diffuse, specular, position, color = [1, 1, 1])
    {
        this.gl = GL.getGL();
        this.colorUniform = colorUniform;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.isOn = 1;
        this.type = null;
        this.position = position;
        this.color = color;
    }

    bind(shader)
    {
        shader.setUniform3f(this.colorUniform + ".position", this.position[0], this.position[1], this.position[2]);
        shader.setUniform3f(this.colorUniform + ".ambient", this.ambient, this.ambient, this.ambient);
        shader.setUniform3f(this.colorUniform + ".diffuse", this.diffuse, this.diffuse, this.diffuse);
        shader.setUniform3f(this.colorUniform + ".specular", this.specular, this.specular, this.specular);
        shader.setUniform1i(this.colorUniform + ".isOn", this.isOn);
        shader.setUniform3f(this.colorUniform + ".color", this.color[0], this.color[1], this.color[2])
    }

    getViewMatrix()
    {
        let viewMatrix = mat4.create();
        mat4.lookAt(viewMatrix, this.position, [0.001, 0.001, 0.001], [0, 1, 0]);
        return viewMatrix;
    }
    
    getLightCube()
    {
        let program = this.gl.createProgram();
        let shader = new Shader(program, vsSourceString, fsSourceString);
        shader.bind();
        let color = new Color("uColor", shader, 1, 1, 1, 32, 1, 1, 1);
        let lightCube = new Cube(shader, false, color, null);
        return lightCube;
    }
}

export default Light
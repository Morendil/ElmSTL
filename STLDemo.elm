import Graphics.Element (..)
import Math.Vector3 (..)
import Math.Matrix4 (..)
import Signal
import Time (..)
import WebGL (..)
import Http (..)
import Array (..)

import ElmSTL (..)

-- Create the scene

main : Signal Element
main =
    Signal.map2 view (loadMesh "whistle-2tone-v1.0.stl") (Signal.foldp (+) 0 (fps 30))


view : Mesh -> Float -> Element
view mesh t =
    webgl (800,600)
    [ entity vertexShader fragmentShader mesh { perspective = perspective (t / 1000) } ]


perspective : Float -> Mat4
perspective t =
    mul (makePerspective 140 1 0.01 100)
        (makeLookAt (vec3 (20 * cos t) 20 (12 * sin t)) (vec3 -12 -20 5) (vec3 0 1 0))


-- Shaders

vertexShader : Shader { attr | position:Vec3 } { unif | perspective:Mat4 } { vcolor:Vec3 }
vertexShader = [glsl|

attribute vec3 position;
uniform mat4 perspective;
varying vec3 vcolor;

void main () {
    gl_Position = perspective * vec4(position, 1.0);
    vcolor = position * .1;
}

|]


fragmentShader : Shader {} u { vcolor:Vec3 }
fragmentShader = [glsl|

precision mediump float;
varying vec3 vcolor;

void main () {
    gl_FragColor = vec4(vcolor, 1.0);
}

|]

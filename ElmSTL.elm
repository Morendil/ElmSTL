module ElmSTL where

import WebGL (..)
import Math.Vector3 (..)
import Array (..)

import Native.ElmSTL

-- Create a mesh with two triangles

type alias Vertex = { position : Vec3 }
type alias Mesh   = List (Triangle Vertex)

loadMesh : String -> Signal Mesh
loadMesh =
  Native.ElmSTL.loadMesh

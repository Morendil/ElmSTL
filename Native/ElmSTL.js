function read(url, onResult, onError) {
  var error = onError || function(err) {};
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        onResult(xhr.response);
      } else {
        error(xhr.status);
      }
    }
  };
  xhr.open("GET", url , true);
  xhr.send(null);
}

function countTris(binaryStl) {
  return new DataView(binaryStl,80,4).getUint32(0,true);
}

function vertex(values,offset) {
  return {position: A3(Elm.Native.MJS.make(Elm).vec3, values[offset*3],
	values[offset*3+1],
	values[offset*3+2]) };
}

function triangle(binaryStl,index) {
  var start = 84+(index*(4*4*3+2));
  var slice = binaryStl.slice(start,start+4*4*3);
  var values = new Float32Array(slice);
  // Return a tuple
  return {ctor:"Tuple3",_0:vertex(values,1),_1:vertex(values,2),_2:vertex(values,3)};
}

function parseMesh(binaryStl) {
  result = [];
  var count = countTris(binaryStl);
  for (var i=0; i<count; i++) {
    result.push(triangle(binaryStl,i));
  }
  return result
}

Elm.Native.ElmSTL = {};
Elm.Native.ElmSTL.make = function(elm) {

  elm.Native = elm.Native || {};
  elm.Native.ElmSTL = elm.Native.ElmSTL || {};
  if (elm.Native.ElmSTL.values) {
      return elm.Native.ElmSTL.values;
  }

  var Signal = Elm.Signal.make(elm);
  var List = Elm.Native.List.make(elm);
  var Array = Elm.Native.Array.make(elm);
  var Utils = Elm.Native. Utils.make(elm);

  // setup logging
  function LOG(msg) {
    // console.log(msg);
  }

  function loadMesh(source) {
    var response = Signal.constant(List.Nil);
    var onLoad = function(binaryStl) {
      elm.notify(response.id, List.fromArray(parseMesh(binaryStl)) );
    }
    var onError = function(e) {
      elm.notify(response.id, List.Nil);
    }
    read(source,onLoad,onError);
    return response;
  }

  return elm.Native.ElmSTL.values = {
    loadMesh:loadMesh
  };

};
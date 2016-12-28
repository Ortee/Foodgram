define({ "api": [  {    "type": "put",    "url": "/api/restaurants/password",    "title": "Change Password",    "name": "ChangePassword",    "group": "Restaurant",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "login",            "description": "<p>Login of the Restaurant.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "oldPassword",            "description": "<p>Old password of the Restaurant.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "newPassword",            "description": "<p>New password of the Restaurant.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "newPassword2",            "description": "<p>Again new password of the Restaurant.</p>"          }        ]      },      "examples": [        {          "title": "Input",          "content": "{\n  \"login\": \"fatbob\",\n  \"oldPassword\": \"fatbob\",\n  \"newPassword\": \"newpass\",\n  \"newPassword2\": \"newpass\",\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Restaurant not found",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        }      ]    },    "filename": "routes/restaurants.js",    "groupTitle": "Restaurant"  },  {    "type": "get",    "url": "/api/restaurants/:login",    "title": "Get Restaurant",    "name": "GetRestaurant",    "group": "Restaurant",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Login",            "optional": false,            "field": "login",            "description": "<p>Restaurant unique LOGIN.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "rest_name",            "description": "<p>Name of the Restaurant.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "login",            "description": "<p>Login of the Restaurant.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "address",            "description": "<p>Address of the Restaurant.</p>"          },          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "avatar",            "description": "<p>Checks if avatar of the Restaurant is set.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Description of the Restaurant.</p>"          },          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "foods",            "description": "<p>Foods of the Restaurant.</p>"          },          {            "group": "Success 200",            "type": "Int",            "optional": false,            "field": "likes",            "description": "<p>Likes of the Restaurant.</p>"          },          {            "group": "Success 200",            "type": "Int",            "optional": false,            "field": "dislikes",            "description": "<p>Dislikes of the Restaurant.</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{\n   \"rest_name\": \"Fat Bob Burger\",\n   \"login\": \"fatbob\",\n   \"address\": \"Kramarska 21, Poznan\",\n   \"avatar\": false,\n   \"description\": \"super opis fat boba\",\n   \"foods\": [\n     {\n      \"uuid\": \"x7dafa30-9b83-11e6-84da-212055eb89db\",\n      \"likes\": 53,\n      \"dislikes\": 23\n     }\n   ],\n   \"likes\": 53,\n   \"dislikes\": 23\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Restaurant not found",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        }      ]    },    "filename": "routes/restaurants.js",    "groupTitle": "Restaurant"  },  {    "type": "put",    "url": "/api/restaurants/update",    "title": "Update Restaurant",    "name": "UpdateRestaurant",    "group": "Restaurant",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "login",            "description": "<p>Login of the Restaurant.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "rest_name",            "description": "<p>Name of the Restaurant.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "address",            "description": "<p>Address of the Restaurant.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Description of the Restaurant.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "avatar",            "description": "<p>Avatar of the Restaurant (base64 format).</p>"          }        ]      },      "examples": [        {          "title": "Input",          "content": "{\n  \"login\": \"fatbob\",\n  \"rest_name\": \"Fat Bob Burger\",\n  \"address\": \"Kramarska 21, Poznan\",\n  \"description\": \"super opis fat boba\",\n  \"avatar\": \"data:image/jpeg;base64,/9j/4AAQS....\"\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Restaurant not found",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        }      ]    },    "filename": "routes/restaurants.js",    "groupTitle": "Restaurant"  }] });

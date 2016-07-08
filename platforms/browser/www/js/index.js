/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
      this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      app.receivedEvent('deviceready');
      app.mapbox();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

      console.log('Received Event: ' + id);
    },
    mapbox: function() {
      //https://api.mapbox.com/styles/v1/mapbox/streets-v9.html?title=true&access_token=
      L.mapbox.accessToken = 'pk.eyJ1IjoidGF0aWFuYSIsImEiOiJjaWs1bzRiZGQwMDdjcHRrc285bTdwcWU5In0.0EWPVHyjaE9jTzNvOiIO-w#1.07/-0.0/0.0';

      var map = L.mapbox.map('map', 'mapbox.streets');

      map.locate({setView: true, maxZoom: 5});

              // Create a featureLayer that will hold a marker and linestring.
              var featureLayer = L.mapbox.featureLayer().addTo(map);
              var secondFeatureLayer = L.mapbox.featureLayer().addTo(map);
              map.locate();


        // Once we've got a position, zoom and center the map
        // on it, and add a single marker.
        map.on('locationfound', function(e) {
          map.fitBounds(e.bounds);
              //console.log(e);
              featureLayer.setGeoJSON({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [e.latlng.lng, e.latlng.lat]
                },
                properties: {
                  'title': 'Here I am!',
                  'marker-color': '#ff8888',
                  'marker-symbol': 'star'
                }
              });

            // And hide the geolocation button
            geolocate.parentNode.removeChild(geolocate);
          });

        // If the user chooses not to allow their location
        // to be shared, display an error message.
        map.on('locationerror', function() {
          function alertDismissed() {
            // do something
          }
          navigator.notification.alert(
                'Position could not be found',  // message
                alertDismissed,         // callback
                'Position',            // title
                'Done'                  // buttonName
                );
        });


      }

};
    app.initialize();
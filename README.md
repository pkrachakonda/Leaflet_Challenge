# Leaflet_Challenge

![image](https://github.com/pkrachakonda/Leaflet_Challenge/assets/20739237/f1cdfc28-a285-4683-83ac-4250b06d3cd5)

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Earthquake Visualization](#earthquake-visualisation)
- [Tectonic Plates](#tectonic-plates)
- [Data Source](#data-source)

## Introduction

This project focuses on *processing and transforming earthquake datasets* for visualisation using Leaflet package. The datasets were downloaded from USGS website as well as a Github source, in geojson format using API. It includes creating Basemaps, Markers and Overlays as well as tectonic plates lines. Each section below outlines the steps to create the respective item from the provided geojson/json datasets.

## Prerequisites

Before getting started with this project, make sure you have the following prerequisites:

- Javascript  [https://developer.mozilla.org/en-US/docs/Web/JavaScript]
- Leaflet and it's libraries [https://leafletjs.com/]
- Basic understanding of html and webscrapping [https://docs.python-guide.org/scenarios/scrape/]
- Basic understanding of D3 [https://d3js.org/]

## Earthquake Visualization

As a first step earthquake data starting from *18th July 2020* till *04th November 2023* with a *minimum magnitude of 4* was selected as query selection criteria. The resulting url [https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2022-07-18%2000:00:00&endtime=2023-11-04%2023:59:59&minmagnitude=4&orderby=time] is used to pull the data for the visualisation.
Uisng D3, the url is converted into an *json* object and various *features* of the object were extracted to be used for data visualisation, such data markers based on *earthquake magnitude* and *depth of epicentre (epidepth)*. For each data point a *popup* with place name, earthquake magnitude, epicentre depth and time of occurence (with reference to AWST) were also created. Four types of maps (*Shaded, Grey, Street and Satellite*) were added in addition to *earthquake and tectnoic plates overlays*.

The radius of earthquake location point was dependent on the *earthquake magnitude* and colour of the point was depend on the "Epidepth* value.

![image](https://github.com/pkrachakonda/Leaflet_Challenge/assets/20739237/fcaa62f7-745a-4ff1-872c-28513ee69210)

## Tectonic Plates

Based on the tectonic plate datasets available at https://github.com/fraxen/tectonicplates and using *D3 packages*, the original tectonic plates boundary data is imported as *geojson*. The data is added to the Map as an *overlay*. 

![image](https://github.com/pkrachakonda/Leaflet_Challenge/assets/20739237/8f5c2e61-b251-4c42-aa66-7f9e50ef9285)

## Data Source

USGS Earthquake Catalog : https://earthquake.usgs.gov/earthquakes/search/ (Access on 04 November 2023)

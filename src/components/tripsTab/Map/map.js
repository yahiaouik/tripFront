import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { useRef, useLayoutEffect } from 'react';
import am4geodata_lang_FR from "@amcharts/amcharts4-geodata/lang/FR";

am4core.useTheme(am4themes_animated);

export default function Map(props) {
    const chart = useRef(null);

    useLayoutEffect(() => {
        let map = am4core.create("chartdiv", am4maps.MapChart);
        map.geodata = am4geodata_worldLow;
        map.geodataNames = am4geodata_lang_FR;
        map.projection = new am4maps.projections.Mercator();
        var polygonSeries = new am4maps.MapPolygonSeries();
        polygonSeries.useGeodata = true;
        map.series.push(polygonSeries);
        polygonSeries.exclude = ["AQ"];
        chart.current = map;
        chart.current.panBehavior = "none";

        var polygonTemplate = polygonSeries.mapPolygons.template;
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#8e8e8e");

        let countries = [];
        const students = {}
        for (let i = 0; i < props.rows.length; i++) {
            if (Object.keys(students).includes(props.rows[i].country)) {
                students[props.rows[i].country].push(props.rows[i].userFirstname + " " + props.rows[i].userLastname)
            } else {
                students[props.rows[i].country] = [props.rows[i].userFirstname + " " + props.rows[i].userLastname];
            }
        }
        for (let i = 0; i < props.rows.length; i++) {
            let data = {
                "id": props.rows[i].countryId.toUpperCase(),
                "name": props.rows[i].country,
                "student": students[props.rows[i].country].toString(),
                "fill": am4core.color("#5C5CFF")
            }
            countries.push(data);
        }

        if (props.role === "ADMIN") {
            polygonTemplate.adapter.add("tooltipText", function (text, ev) {
                if (!ev.dataItem.dataContext.student) {
                    return "{name}";
                }
                return "{name} : {student}";
            })
        }
        else {
            polygonTemplate.tooltipText = "{name}";
        }
        polygonSeries.data = countries;
        polygonTemplate.propertyFields.fill = "fill";
        return () => {
            map.dispose();
        };
    }, []);

    return (
        <div id="chartdiv" style={{ width: "100%", height: "500px", margin: "2%" }}></div>
    );
}
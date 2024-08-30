import React, { useEffect, useImperativeHandle,forwardRef, useRef, useState } from 'react';
import {Button } from '@mui/material';
const DiagramEditor = () => {
    const [diagramXml, setDiagramXml] = useState('');
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [diagramInit, setDiagramInit] = useState(false);
    const iframeRef = useRef(null);

    useEffect(() => {
        // Load sample class diagram XML
        const sampleDiagram = `
          <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">
            <root>
            <mxCell id="0"/>
            <mxCell id="1" parent="0"/>
            <mxCell id="2" value="User" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;" vertex="1" parent="1">
                <mxGeometry x="330" y="220" width="160" height="86" as="geometry"/>
            </mxCell>
            <mxCell id="3" value="+ name: String" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="2">
                <mxGeometry y="26" width="160" height="26" as="geometry"/>
            </mxCell>
            <mxCell id="4" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="2">
                <mxGeometry y="52" width="160" height="8" as="geometry"/>
            </mxCell>
            <mxCell id="5" value="+ method(type): type" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="2">
                <mxGeometry y="60" width="160" height="26" as="geometry"/>
            </mxCell>
            </root>
        </mxGraphModel>
        `;
        setDiagramXml(sampleDiagram);
      }, []);

      const loadDiagram = () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow.postMessage(JSON.stringify({action: 'load', xml: diagramXml}), '*');
        }
      };

    //   useImperativeHandle(ref,()=>({
    //     loadDiagram: loadDiagram
    //   }));

      useEffect(() => {
        if (iframeLoaded && diagramXml) {
          loadDiagram();
        }
      }, [iframeLoaded, diagramXml, diagramInit]);
    
      useEffect(() => {
        const handleMessage = (event) => {
          if (event.data && event.data.length > 0) {
            try {
              const msg = JSON.parse(event.data);
              if (msg.event === 'export') {
                setDiagramXml(msg.data);
              }else if (msg.event === 'save') {
                console.log("saket", msg.xml)
                setDiagramXml(msg.xml);
              }else if (msg.event === 'init') {
                setDiagramInit(true);
              }
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          }
        };
    
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
      }, []);

    return (
        <div>
            <iframe
                ref={iframeRef}
                src={`https://embed.diagrams.net/?embed=1&ui=min&spin=1&modified=unsavedChanges&proto=json`}
                width="100%"
                height="650px"
                className="border"
                onLoad={() => setIframeLoaded(true)}
              />
        </div>
      );
};

export default DiagramEditor;
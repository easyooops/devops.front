/**
 * -----------------------------------------------------------------------------
 * MIT License
 * Copyright (c) 2021 EasyOops
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * -----------------------------------------------------------------------------
 *
 * date         : 2021.09.01
 * creater      : EasyOops
 * description  : CircleCI define
 **/
import { jobs_main } from "./jobs";
// import { defaults_main } from "./defaults";
import { workflows_main } from "./workflows";

/* config >> cricleci */
export const config_cricleci = (_in) => {

    let jsonroot = {};

    jsonroot['version'] = 2;
    //jsonroot['defaults'] = defaults_main();
    jsonroot['workflows'] = workflows_main(_in);
    jsonroot['jobs'] = jobs_main(_in);

    return jsonroot;
};

/* config >> script/start.sh */
export const config_start = () => {

    let file = '';

    file += '#!/usr/bin/env bash\n\n';
    file += 'sleep 30\n';
    file += 'cd /home/tomcat/apache-tomcat-8.5.72/bin/  || { echo "cd cd /home/tomcat/apache-tomcat-8.5.72/bin/  fail"; exit 1; }\n';
    file += 'sh startup.sh';

    return file;
};

/* config >> script/stop.sh */
export const config_stop = () => {

    let file = '';

    file += '#!/usr/bin/env bash\n\n';
    file += 'cd /home/tomcat/apache-tomcat-8.5.72/bin/ || { echo "cd /home/tomcat/apache-tomcat-8.5.72/bin/ fail"; exit 1; }\n';
    file += 'sh shutdown.sh\n';
    file += 'sleep 20\n';
    file += 'cd /home/tomcat/deployments || { echo "cd /home/tomcat/deployments/ fail"; exit 1; }\n';
    file += 'rm -rf ROOT.war.bak\n\n';
    file += 'if [ -f ROOT.war ]; then\n';
    file += 'mv ROOT.war ROOT.war.bak\n';
    file += 'else\n';
    file += 'echo "ROOT.war file not found "\n';
    file += 'fi\n\n';
    file += 'rm -rf ROOT\n';

    return file;
};

/* config >> build.sh */
export const config_ant= () => {

    let file = '';
    let parser;
    let xmlDoc;

    // if (window.DOMParser) {
    //     parser = new DOMParser();
    //     xmlDoc = parser.parseFromString(file,"text/xml");
    // } else {                  // IE
    //     xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    //     xmlDoc.async = false;
    //     xmlDoc.loadXML(file);
    // }

    // let project = xmlDoc.createElement('project');
    // let project_name = xmlDoc.createAttribute('name');
    // project_name.nodeValue = 'projects';
    // project.setAttributeNode(project_name);
    // let project_default = xmlDoc.createAttribute('name');
    // project_default.nodeValue = 'dist';
    // project.setAttributeNode(project_default);


    // let property = xmlDoc.createElement('property');
    // project.setAttributeNode(xmlDoc.createAttribute('name'));
    // project.setAttributeNode(xmlDoc.createAttribute('default'));
    // project.
    //
    file += '<?xml version="1.0" encoding="UTF-8" ?>';
    file += '\n';
    file += '\n  <project name="projects" default="dist">';
    file += '\n';
    file += '\n    <target name="clean-all" depends="clean,init,compile" description="clean all"/>';
    file += '\n    <target name="dist" depends="war" description="default build"/>';
    file += '\n';
    file += '\n    <path id="compile.classpath">';
    file += '\n     <fileset dir="WebContent/WEB-INF/lib">';
    file += '\n         <include name="*.jar"/>';
    file += '\n     </fileset>';
    file += '\n    </path>';
    file += '\n';
    file += '\n    <target name="init">';
    file += '\n     <mkdir dir="bin"/>';
    file += '\n     <mkdir dir="dist"/>';
    file += '\n    </target>';
    file += '\n';
    file += '\n    <target name="compile" depends="init-compile">';
    file += '\n     <javac destdir="bin" debug="true" includeantruntime="false" encoding="UTF-8">';
    file += '\n        <src path="src/main"/>';
    file += '\n        <classpath refid="compile.classpath"/>';
    file += '\n     </javac>';
    file += '\n    </target>';
    file += '\n';
    file += '\n    <target name="init-compile">';
    file += '\n     <copy todir="bin" includeemptydirs="false">';
    file += '\n         <fileset dir="src/main/java" excludes="**/*.java"/>';
    file += '\n     </copy>';
    file += '\n     <copy todir="bin" includeemptydirs="false">';
    file += '\n         <fileset dir="src/main/resource" excludes="**/*.java"/>';
    file += '\n     </copy>';
    file += '\n    </target>';
    file += '\n';
    file += '\n    <target name="war">';
    file += '\n     <war destfile="dist/ROOT.war" webxml="WebContent/WEB-INF/web.xml">';
    file += '\n        <fileset dir="WebContent">';
    file += '\n        </fileset>';
    file += '\n        <classes dir="bin"/>';
    file += '\n     </war>';
    file += '\n    </target>';
    file += '\n';
    file += '\n    <target name="clean">';
    file += '\n     <delete dir="dist" includeemptydirs="true"/>';
    file += '\n     <delete dir="bin" includeemptydirs="true"/>';
    file += '\n    </target>';
    file += '\n';
    file += '\n  </project>';

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(file,"text/xml");

    return (new XMLSerializer()).serializeToString(xmlDoc);
};



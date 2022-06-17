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
 * description  : CircleCI steps define
 **/

/* steps >> checkout */
export const steps_checkout = () => {
    return "checkout";
};

/* steps >> restore_cache */
export const steps_restore_cache = () => {

    let jsonObj = {};
    let jsonObj2 = {};
    let jsonArr = [];

    jsonArr.push('devops-{{ checksum "pom.xml" }}');
    jsonArr.push('devops-');

    jsonObj2['keys'] = jsonArr;
    jsonObj['restore_cache'] = jsonObj2;

    return jsonObj;
};

/* steps >> save_cache */
export const steps_save_cache = () => {

    let jsonObj = {};
    let jsonObj2 = {};
    let jsonArr = [];

    jsonArr.push('~/.m2');

    jsonObj2['key'] = 'devops-{{ checksum "pom.xml" }}';
    jsonObj2['paths'] = jsonArr;
    jsonObj['save_cache'] = jsonObj2;

    return jsonObj;
};

/* steps >> attach_workspace */
export const steps_attach_workspace = () => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['at'] = '.';
    jsonObj['attach_workspace'] = jsonObj2;

    return jsonObj;
};

/*******************************************************
 * BUILD
 ********************************************************/
/** Maven **/
/* steps >> run_maven_off_build */
export const steps_run_maven_off_build = () => {

    let jsonObj = {};

    jsonObj['run'] = 'mvn dependency:go-offline';

    return jsonObj;
};

/* steps >> run_maven_clean */
export const steps_run_maven_clean_build = () => {

    let jsonObj = {};

    jsonObj['run'] = 'mvn -Dmaven.test.skip=true clean package';

    return jsonObj;
};

/** Ant **/
/* steps >> run_ant_clean_build */
export const steps_run_ant_clean_build = () => {

    let jsonObj = {};

    jsonObj['run'] = 'ant -buildfile build.xml clean-all';

    return jsonObj;
};

/* steps >> run_ant_compile_build */
export const steps_run_ant_compile_build = () => {

    let jsonObj = {};

    jsonObj['run'] = 'ant -buildfile build.xml dist';

    return jsonObj;
};

/* steps >> run_ant_remove_build */
export const steps_run_ant_remove_build = (_in) => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['name'] = 'remove tar';
    jsonObj2['command'] = 'rm -rf '+_in.upload_file_name;
    jsonObj['run'] = jsonObj2;

    return jsonObj;
};

/* steps >> run_ant_make_build */
export const steps_run_ant_make_build = (_in) => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['name'] = 'make tar';
    jsonObj2['command'] = 'tar -zcvf '+_in.upload_file_name+' scripts/*.sh ./appspec.yml dist/ROOT.war';
    jsonObj['run'] = jsonObj2;

    return jsonObj;
};

/*******************************************************
* TEST
********************************************************/
/* steps >> run_integration_test */
export const steps_run_integration_test = () => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['name'] = 'Test';
    jsonObj2['command'] = 'mvn integration-test';
    jsonObj['run'] = jsonObj2;

    return jsonObj;
};

/*******************************************************
 * UPLOAD
 ********************************************************/
/* steps >> ssh_upload */
export const steps_ssh_upload = (_in) => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['name'] = 'Upload to SSH';
    jsonObj2['no_output_timeout'] = '30m';
    jsonObj2['command'] = 'scp -q -r -o StrictHostKeyChecking=no '+_in.upload_file_name+' '+_in.upload_ssh_host+':'+_in.upload_ssh_path;
    jsonObj['run'] = jsonObj2;

    return jsonObj;
};

/* steps >> s3_upload */
export const steps_s3_upload = (_in) => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['name'] = 'Upload to S3(AWS)';
    jsonObj2['no_output_timeout'] = '30m';
    jsonObj2['command'] = 'aws s3 cp '+_in.upload_file_name+' s3://'+_in.upload_s3_location+'/'+_in.upload_s3_name+'/';
    jsonObj['run'] = jsonObj2;

    return jsonObj;
};

/*******************************************************
 * DEPLOY
 ********************************************************/
/* steps >> ssh_deploy */
export const steps_ssh_deploy = (_in) => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['name'] = 'Deploy to SSH';
    jsonObj2['no_output_timeout'] = '30m';
    if(_in.jobs_upload_type === '01') {
        jsonObj2['command'] = 'ssh -p '+_in.upload_ssh_port+' '+_in.upload_ssh_host+' -o StrictHostKeyChecking=no "cp '+_in.upload_ssh_path+'/'+_in.upload_file_name+' '+_in.deploy_ssh_path+'; '+_in.deploy_was_stop+'; '+_in.deploy_was_start+';"';
    } else if(_in.jobs_upload_type === '02') {
        jsonObj2['command'] = 'ssh -p '+_in.upload_ssh_port+' '+_in.upload_ssh_host+' -o StrictHostKeyChecking=no "aws s3 cp '+_in.upload_file_name+' s3://'+_in.upload_s3_location+'/'+_in.upload_s3_name+'/; '+_in.deploy_was_stop+'; '+_in.deploy_was_start+';"';
    }
    jsonObj['run'] = jsonObj2;

    return jsonObj;
};

/* steps >> aws_auth_deploy */
export const steps_aws_auth_deploy = (_in) => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['name'] = 'Aws Account Set';
    jsonObj2['command'] = 'aws configure set aws_access_key_id '+_in.deploy_aws_access+'\naws configure set aws_secret_access_key  '+_in.deploy_aws_secret+'\naws configure set default.region '+_in.deploy_aws_region;

    jsonObj['run'] = jsonObj2;

    return jsonObj;
};

/* steps >> aws_cd_deploy */
export const steps_aws_cd_deploy = (_in) => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['name'] = 'Deploy to CodeDeploy(AWS)';
    jsonObj2['no_output_timeout'] = '30m';
    jsonObj2['command'] = 'aws deploy create-deployment --application-name '+_in.deploy_aws_cd_name+' --deployment-group-name '+_in.deploy_aws_cd_group+' --s3-location bucket='+_in.upload_s3_name+',key='+_in.upload_s3_location+'/'+_in.upload_file_name+',bundleType=tgz > deploy_logs.txt';

    jsonObj['run'] = jsonObj2;

    return jsonObj;
};

/*******************************************************
 * STORE
 ********************************************************/
/* steps >> store_test_results */
export const steps_store_test_results = () => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['path'] = './devops/test_logs';
    jsonObj['store_test_results'] = jsonObj2;

    return jsonObj;
};

/* steps >> store_artifacts */
export const steps_store_artifacts = (_in) => {

    let jsonObj = {};
    let jsonObj2 = {};

    jsonObj2['path'] = _in;
    jsonObj['store_artifacts'] = jsonObj2;

    return jsonObj;
};

/* steps >> persist_to_workspace */
export const steps_persist_to_workspace = () => {

    let jsonObj = {};
    let jsonObj2 = {};
    let jsonArr = [];

    jsonArr.push('.');

    jsonObj2['root'] = '.';
    jsonObj2['paths'] = jsonArr;
    jsonObj['persist_to_workspace'] = jsonObj2;

    return jsonObj;
};
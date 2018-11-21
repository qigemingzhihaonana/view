import axios from '@/utils/axios'

//queryTask, addTask, editTask,

/**
 * 查询项目信息
 * @param {项目编号} itemNo
 * @param {项目名称} itemName
 * @param {业务类型} businessType
 */
export function queryTask(itemNo, itemName, businessType) {
    const data = {
        itemName,
        itemNo,
        businessType
    }
    return axios({
        url: '/busBitem/selectProjectByUser',
        method: 'post',
        data
    })
}

/**
 * 新增项目
 * @param {data} data 
 */
export function addTask(busBitem) {
    const data = {
        key:'project',
        busBitem
    }
    return axios({
        url: '/activiti/startProcessInstance',
        method: 'post',
        data
    })
}

/**
 * 修改项目
 * @param {data} data 
 */
export function editTask(data) {
    return axios({
        url: '/',
        method: 'post',
        data
    })
}

/**
 * 挂起任务
 * @param {id} id 
 */
export function stopTask(id) {
    return axios({
        url: '/',
        method: 'get',
        params: id
    })
}

/**
 * 查询任务进度
 */
export function taskStep(procInstd) {
    const data = {
        procInstd
    }
    return axios({
        url: '/busBitem/getProjectStep',
        method: 'post',
        data
    })
}
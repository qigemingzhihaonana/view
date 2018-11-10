import axios from '@/utils/axios'

/**
 * 获取流程编辑配置的基本信息
 * @param {id} id 
 */
export function fetch(id) {
    return axios({
        url: '/' + id,
        method: 'get'
    })
}

/**
 * 新增流程编辑配置
 * @param {data} data 
 */
export function addTaskEdit(data) {
    return axios({
        url: '/',
        method: 'post',
        params: data
    })
}

/**
 * 更新流程编辑配置
 * @param {} data 
 */
export function updateTaskEdit(data) {
    return axios({
        url: '/',
        method: 'post',
        params: data
    })
}

/**
 * 删除流程编辑配置
 * @param {} data 
 */
export function deleTaskEdit(data) {
    return axios({
        url: '/',
        method: 'post',
        params: data
    })
}
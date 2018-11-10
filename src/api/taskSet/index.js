import axios from '@/utils/axios'

/**
 * 查询流程配置信息
 * @param {id} name 
 */
export function fetchTask(name) {
    return axios ({
        url: '/' + name,
        method: 'get'
    })
}

/**
 * 添加流程配置信息
 * @param {task} data 
 */
export function addTask(data) {
    return axios ({
        url: '/',
        method: 'post',
        params: data
    })
}

/**
 * 删除流程配置信息
 * @param {id} id 
 */
export function delTask(id) {
    return axios ({
        url: '/' + id,
        method: 'get',
    })
}

/**
 * 更新流程配置信息
 * @param {data} data 
 */
export function updateTask(data) {
    return axios ({
        url: '/',
        method: 'post',
        params: data
    })
}
import axios from '@/utils/axios'

/**
 * 查找所有参数类型
 */
export function fetchMessage() {
    return axios({
        url: '/parameter/selectAllParameterType',
        method: 'get'
    })
}

/**
 * 通过参数名称获取详细信息
 * @param {name} name 
 */
export function fetchALLmessage(name) {
    return axios({
        url: '/parameter/selectParameterByParameterType/' + name,
        method: 'get'
    })
}

/***
 * 更新参数
 */
export function updatMessage(data) {
    return axios({
        url: '/parameter/updateParameterType',
        method: 'post',
        data
    })
}

/**
 * 删除参数
 */
export function delectMessage(id) {
    return axios({
        url: '/parameter/deleteParameterType/' + id,
        method: 'get'
    })
}

/***
 * 新增参数
 */
export function addMessage(data) {
    return axios({
        url: '/parameter/insertParameterType',
        method: 'post',
        data
    })
}

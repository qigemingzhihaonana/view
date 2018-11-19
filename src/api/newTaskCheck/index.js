import axios from '@/utils/axios'

/**
 * 获取审批的项目
 */
export function fetchTask() {
    return axios({
        url: '/',
        method: 'get',
    })
}

/**
 * 驳回项目请求
 */
export function backTask(id) {
    return axios({
        url: '/',
        method: 'get',
        params: id
    })
}

/**
 * 同意项目通过
 */
export function agreeTask(id) {
    return axioss({
        url: '/',
        method: 'get',
        params: id
    })
}
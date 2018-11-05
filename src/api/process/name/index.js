import axios from '@/utils/axios'

/*获取流程名称*/
export function fetch() {
	return axios({
		url: '/',
		method: 'get',
	})
}

/*新增流程名称*/
export function addProcessName(data) {
	return axios({
		url: '/',
		method: 'post',
		params: data
	})
}

/*删除流程名称*/
export function delectProcessName(id) {
	return axios({
		url: '/' + id,
		method: 'get'
	})
}

/*更新流程节点*/
export function updateProcessName(data) {
	return axios({
		url: '/',
		method: 'post',
		params: data
	})
}

import axios from '@/utils/axios'

/*获取流程配置信息*/
export function fetch() {
	return axios({
		url: '/',
		method: 'get'
	})
}

/*删除流程配置信息*/
export function delectTaskSet(id) {
	return axios({
		url: '/' + id,
		method: 'get'
	})
}

/*新增流程配置信息*/
export function addTaskSet(data) {
	retrun axios({
		url: '/',
		method: 'post',
		params: data
	})
}

/*更新流程配置信息*/
export function updateTakSet(data) {
	return axios({
		url: '/',
		method: 'post',
		params: data
	})
}

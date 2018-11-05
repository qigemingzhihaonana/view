import axios from '@/utils/axxios'

/*获取流程节点信息*/
export function fetch() {
	return axios({
		url: '/',
		method: 'get'
	})
}

/*新增流程节点*/
export function addTask(data) {
	return axios({
		url: '/',
		method: 'post',
		params: data
	})
}

/*删除流程节点*/
export function delectTask(id) {
	return axios({
		url: '/' + id,
		method: 'get'
	})
}

/*更新流程节点*/
export function updateTask(data) {
	return axios({
		url: '/',
		method: 'post',
		params: data
	})
}

import axios from '@/utils/axio'

/*
获取检测维护标准
*/
export function getMessage() {
	return axios({
		url: '/',
		method: 'get'
	})
}

/*
增加检测标准
*/
export function addCheckStander(data) {
	return axios({
		url: '/',
		method: 'post',
		data
	})
}

/*
删除检测标准
*/
export function delectStander(id) {
	return axios({
		url: '/' + id,
		method: 'get'
	})
}

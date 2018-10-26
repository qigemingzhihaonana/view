import axios from '@/utils/axios'

//获取数字字典的参数
export function getTree() {
	return axios({
		url: '',
		method: 'get'
	})
}

//获取数字字典的详细信息
export function getTreeMessage(id) {
	return axios({
		url: '/' + id,
		method: 'get'
	})
}

//新增数字字典
export function createNewDirction(data) {
	return axios({
		url: '/',
		method: 'post',
		params: data
	})
}

//获取已有的数字字典的类型
export function getType(id) {
	url: '/' + id,
	method: 'get'
}

//修改数字字典
export function updataDirction(data) {
	url: '/',
	method: 'post',
	params: data
}

//删除数字字典
export function delectDirction(id) {
	url: '/' + id,
	method: 'get'
}

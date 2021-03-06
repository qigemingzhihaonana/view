import axios from '@/utils/axios'

//获取数字字典的参数
export function getTree() {
	return axios({
		url: '/parameter/selectParameter',
		method: 'get'
	})
}

//获取数字字典的详细信息
export function getTreeMessage(id) {
	return axios({
		url: '/parameter/selectAllParameterInformation/' + id,
		method: 'get'
	})
}

//新增数字字典参数
export function createNewDirction(data) {
	return axios({
		url: '/parameter/insertParameter',
		method: 'post',
		data
	})
}

//获取已有的数字字典的类型
export function getType(id) {
	return axios({
		url: '/' + id,
		method: 'get'
	})
}

//修改数字字典参参数
export function updataDirction(data) {
	return axios({
		url: '/parameter/updateParameter',
		method: 'post',
		data
	})
}

//删除数字字典参数
export function delectDirction(id) {
	return axios({
		url: '/parameter/deleteParameter/' + id,
		method: 'get'
	})
}

//新增数据字典
export function createNewTree(data) {
	return axios({
		url: '/',
		method: 'post',
		data
	})
}

//编辑数据字典
export function editTree(data) {
	return axios({
		url: '/',
		method: 'post',
		data
	})
}

//删除数据字典
export function delectTree(id) {
	return axios({
		url: '/' + id,
		method: 'get'
	})
}

//获取参数类型
export function getparamType()  {
	return axios({
		url:'/parameter/selectAllParameterType',
		method: 'get'
	})
}
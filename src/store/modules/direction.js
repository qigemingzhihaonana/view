import {
	getTree,
	getTreeMessage,
	createNewDirction,
	getType,
	updataDirction,
	delectDirction,
	createNewTree,
	editTree,
	delectTree
} from '@/api/direction'

const direction = {
		state: {
			treeData: [],
			tableData: [],
			myType: []
		},

		mutations: {
			SET_TREEDATA: (state, data) => {
				state.treeData = data
			},
			SET_TABLEDATA: (state, data) => {
				state.tableData = data
			},
			SET_TYPE: (state, data) => {
				state.myType = data
			}
		},

		actions: {
			//获取数据字典节点信息
			GetTree({
				commit
			}) {
				return new Promise((resolve, reject) => {
					getTree().then(response => {
						// const data = response.data.data
						const data = response.data
						console.log(response)
						commit('SET_TREEDATA', data)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//获取数据字典详细信息
			GetTreeMessage({
				commit
			}, id) {
				return new Promise((resolve, reject) => {
					getTreeMessage(id).then(response => {
						// const table = []
						// if(response.data.data.length === 1 || response.data.data.length === undefined) {
						// 	table.push(response.data.data)
							commit('SET_TABLEDATA', response.data)
						//} else {
							commit('SET_TABLEDATA', response.data)
					//	}
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//删除字段
			Delect({
				dispath
			}, id) {
				return new Promise((resolve, reject) => {
					delectDirction(id).then(() => {
						dispath('GetTree')
						dispath('GetTreeMessage', id)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//更新字段
			Update({
				dispath
			}, data) {
				return new Promise((resolve, reject) => {
					updataDirction(data).then(() => {
						dispath('GetTree')
						dispath('GetTreeMessage', data.id)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//新建字段
			CreateNew({
				dispath
			}, data) {
				return new Promise((resolve, reject) => {
					createNewDirction(data).then(() => {
						dispath('GetTree')
						dispath('GetTreeMessage', data.id)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//新建数据字典
			newTree({
				dispath
			}, data) {
				return new Promise((resolve, reject) => {
					createNewTree(data).then(() => {
						dispath('GetTree')
						resolve()
					}).catch(error => {
						reject()
					})
				})
			},
			//编辑数据字典
			updateTree({
				dispath
			}, data) {
				return new Promise((resolve, reject) => {
					editTree(data).then(() => {
						dispath('GetTree')
						dispath('GetTreeMessage', data.id)
						resolve()
					}).catch(error => {
						reject()
					})
				})
			},
			//删除数据字典
			delTree({
				dispath
			}, id) {
				return new Promise((resolve, reject) => {
					delectTree(id).then(() => {
						dispath('GetTree')
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			type({
				commit
			}) {
				return new Promise((resolve, reject) => {
					getType().then(response => {
						const type = response.data
						commit('SET_TYPE', type)
					})
				})
			}

		}
	}

export default direction

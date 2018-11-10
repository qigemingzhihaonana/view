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
						const data = response.data.data
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
						 const table = []
						 if(response.data.data === null || response.data.data.length === 1 || response.data.data.length === undefined) {
						 	table.push(response.data.data)
							commit('SET_TABLEDATA', table)
						} else {
							commit('SET_TABLEDATA', response.data.data)
						}
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//删除字段
			Delect({
				dispatch
			}, id) {
				return new Promise((resolve, reject) => {
					delectDirction(id).then(() => {
						dispatch('GetTree')
						dispatch('GetTreeMessage', id)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//更新字段
			Update({
				dispatch
			}, data) {
				return new Promise((resolve, reject) => {
					console.log(data)
					updataDirction(data).then(() => {
						dispatch('GetTree')
						dispatch('GetTreeMessage', data.id)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//新建字段
			CreateNew({
				dispatch
			}, data) {
				return new Promise((resolve, reject) => {
					console.log(data)
					createNewDirction(data).then(() => {
						dispatch('GetTree')
						dispatch('GetTreeMessage', data.id)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//新建数据字典
			newTree({
				dispatch
			}, data) {
				return new Promise((resolve, reject) => {
					createNewTree(data).then(() => {
						dispatch('GetTree')
						resolve()
					}).catch(error => {
						reject()
					})
				})
			},
			//编辑数据字典
			updateTree({
				dispatch
			}, data) {
				return new Promise((resolve, reject) => {
					editTree(data).then(() => {
						dispatch('GetTree')
						dispatch('GetTreeMessage', data.id)
						resolve()
					}).catch(error => {
						reject()
					})
				})
			},
			//删除数据字典
			delTree({
				dispatch
			}, id) {
				return new Promise((resolve, reject) => {
					delectTree(id).then(() => {
						dispatch('GetTree')
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

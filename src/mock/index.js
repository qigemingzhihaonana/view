import Mock from 'mockjs'
import Direction from './direction'

//获取数据字典信息
Mock.mock(/\/parameter\/selectParameter/, 'get', Direction.fetchDirection)
//获取数据字典详细信息
Mock.mock(/\/parameter\/selectAllParameterInformation\/*/,'get', Direction.fecthMessage)
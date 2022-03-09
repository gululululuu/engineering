import XLSX from 'xlsx'
import xlsxStyle from 'xlsx-style'
import xlsxSave from 'file-saver'
// 对象，用于调用方法
var dataConversionUtil = {}
// 将数据转换成Excel，单个sheet保存
// fileName文件名,tableHeader表头,dataList表数据,sheet='sheet1'工作表默认名字是sheet1
dataConversionUtil.dataToExcel = function (fileName, tableHeader, dataList, sheet = fileName) {
  // excel的表头和数据
  let aoa = []
  // aoa的数据格式：[[],[],[],[]]   数组的第一个子数组可以指定为表头  根据情况而定
  aoa = tableHeader.concat(dataList)
  let workSheet = XLSX.utils.aoa_to_sheet(aoa)
  workSheet['!merges'] = [
    // 设置单元格合并
    {s: {r: 0, c: 0}, e: {r: 0, c: 7}},
    {s: {r: 1, c: 0}, e: {r: 1, c: 7}},
    {s: {r: 2, c: 0}, e: {r: 2, c: 7}},
    {s: {r: 5, c: 1}, e: {r: 5, c: 7}},
    {s: {r: 6, c: 1}, e: {r: 6, c: 7}},
    {s: {r: 7, c: 1}, e: {r: 7, c: 7}},
    {s: {r: 8, c: 1}, e: {r: 8, c: 7}}
  ]
  // 单元格宽度
  let width = []
  // 设置单元格属性
  Object.keys(workSheet).forEach((key) => {
    if (key.indexOf('!') < 0) {
      if (/A/.test(key) || /C/.test(key) || /E/.test(key) || /G/.test(key)) {
        workSheet[key].s = {
          font: {
            name: '宋体',
            sz: 12,
            bold: true
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center',
            wrapText: true
          }
        }
      } else {
        workSheet[key].s = {
          font: {
            name: '宋体',
            sz: 10
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center',
            wrapText: true
          }
        }
      }
      width.push({ wpx: 120 })
    }
  })
  workSheet['!cols'] = width
  workSheet['!rows'] = [
    { hpx: 20 },
    { hpx: 70 },
    { hpx: 20 },
    { hpx: 20 },
    { hpx: 20 },
    { hpx: 50 },
    { hpx: 50 },
    { hpx: 50 },
    { hpx: 50 },
    { hpx: 20 },
    { hpx: 20 },
    { hpx: 20 }
  ]
  console.log(workSheet)
  let workBook = XLSX.utils.book_new()
  // 把数据写到工作簿中
  XLSX.utils.book_append_sheet(workBook, workSheet, sheet)
  // 如果一个工作工作簿中有多个工作表，可以修改参数类型并遍历添加，期中workBook是同一个，workSheet和sheet根据自己的需求添加，
  // 比如在此处添加第二个工作表叫‘第二张表’，把数据封装好后，数据格式同上,假如数据叫workSheet2，执行下面代码，工作簿就会多一张工作表叫‘第二张表’
  // XLSX.utils.book_append_sheet(workBook,workSheet2,'第二张表')
  // 保存
  console.log(workBook)
  const wbout = xlsxStyle.write(workBook, {
    type: 'binary',
    bookType: 'xlsx'
  })
  xlsxSave.saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }), fileName + '.xlsx')
}

dataConversionUtil.investigationToExcel = function (fileName, tableHeader, dataList, sheet = fileName) {
  // excel的表头和数据
  let aoa = []
  // aoa的数据格式：[[],[],[],[]]   数组的第一个子数组可以指定为表头  根据情况而定
  aoa = tableHeader.concat(dataList)
  let workSheet = XLSX.utils.aoa_to_sheet(aoa)
  workSheet['!merges'] = [
    // 设置单元格合并
    {s: {r: 0, c: 0}, e: {r: 0, c: 5}},
    {s: {r: 1, c: 2}, e: {r: 1, c: 5}}
  ]
  // 单元格宽度
  let width = []
  // 单元格高度
  let height = []
  // 设置单元格属性
  Object.keys(workSheet).forEach((key) => {
    if (key.indexOf('!') < 0) {
      workSheet[key].s = {
        font: {
          name: '宋体',
          sz: 12
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center',
          wrapText: true
        }
      }
    }
    width.push({ wpx: 120 })
    height.push({ hpx: 20 })
  })
  workSheet['!cols'] = width
  workSheet['!rows'] = height
  console.log(workSheet)
  let workBook = XLSX.utils.book_new()
  // 把数据写到工作簿中
  XLSX.utils.book_append_sheet(workBook, workSheet, sheet)
  // 如果一个工作工作簿中有多个工作表，可以修改参数类型并遍历添加，期中workBook是同一个，workSheet和sheet根据自己的需求添加，
  // 比如在此处添加第二个工作表叫‘第二张表’，把数据封装好后，数据格式同上,假如数据叫workSheet2，执行下面代码，工作簿就会多一张工作表叫‘第二张表’
  // XLSX.utils.book_append_sheet(workBook,workSheet2,'第二张表')
  // 保存
  console.log(workBook)
  const wbout = xlsxStyle.write(workBook, {
    type: 'binary',
    bookType: 'xlsx'
  })
  xlsxSave.saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }), fileName + '.xlsx')
}

dataConversionUtil.exportToExcel = function (fileName, tableHeader, dataList, sheet = fileName) {
  // excel的表头和数据
  let aoa = []
  // aoa的数据格式：[[],[],[],[]]   数组的第一个子数组可以指定为表头  根据情况而定
  aoa = tableHeader.concat(dataList)
  let workSheet = XLSX.utils.aoa_to_sheet(aoa)
  workSheet['!merges'] = [
    // 设置单元格合并
    {s: {r: 0, c: 0}, e: {r: 1, c: 13}},
    {s: {r: 2, c: 0}, e: {r: 2, c: 2}},
    {s: {r: 2, c: 3}, e: {r: 2, c: 6}},
    {s: {r: 2, c: 7}, e: {r: 2, c: 8}},
    {s: {r: 2, c: 9}, e: {r: 2, c: 12}},
    {s: {r: 3, c: 0}, e: {r: 3, c: 2}},
    {s: {r: 3, c: 3}, e: {r: 3, c: 6}},
    {s: {r: 3, c: 7}, e: {r: 3, c: 8}},
    {s: {r: 3, c: 9}, e: {r: 3, c: 12}},
    {s: {r: 4, c: 0}, e: {r: 4, c: 2}},
    {s: {r: 4, c: 3}, e: {r: 4, c: 6}},
    {s: {r: 4, c: 7}, e: {r: 4, c: 8}},
    {s: {r: 4, c: 9}, e: {r: 4, c: 12}},
    {s: {r: 5, c: 0}, e: {r: 5, c: 1}},
    {s: {r: 6, c: 0}, e: {r: 6, c: 1}},
    {s: {r: 7, c: 0}, e: {r: 7, c: 1}},
    {s: {r: 8, c: 0}, e: {r: 8, c: 1}},
    {s: {r: 9, c: 0}, e: {r: 9, c: 1}},
    {s: {r: 10, c: 0}, e: {r: 10, c: 1}},
    {s: {r: 11, c: 0}, e: {r: 11, c: 1}},
    {s: {r: 12, c: 0}, e: {r: 12, c: 1}},
    {s: {r: 13, c: 0}, e: {r: 13, c: 1}},
    {s: {r: 14, c: 0}, e: {r: 14, c: 1}},
    {s: {r: 15, c: 0}, e: {r: 15, c: 1}},
    {s: {r: 16, c: 0}, e: {r: 16, c: 1}},
    {s: {r: 17, c: 0}, e: {r: 17, c: 10}},
    {s: {r: 18, c: 0}, e: {r: 18, c: 1}},
    {s: {r: 19, c: 0}, e: {r: 19, c: 1}},
    {s: {r: 20, c: 0}, e: {r: 20, c: 1}},
    {s: {r: 21, c: 0}, e: {r: 21, c: 1}},
    {s: {r: 22, c: 0}, e: {r: 22, c: 13}},
    {s: {r: 23, c: 0}, e: {r: 24, c: 1}},
    {s: {r: 23, c: 2}, e: {r: 24, c: 4}},
    {s: {r: 23, c: 5}, e: {r: 24, c: 13}},
    {s: {r: 25, c: 0}, e: {r: 25, c: 1}},
    {s: {r: 25, c: 2}, e: {r: 25, c: 4}},
    {s: {r: 25, c: 5}, e: {r: 25, c: 13}},
    {s: {r: 26, c: 0}, e: {r: 26, c: 1}},
    {s: {r: 26, c: 2}, e: {r: 26, c: 4}},
    {s: {r: 26, c: 5}, e: {r: 26, c: 13}},
    {s: {r: 27, c: 0}, e: {r: 27, c: 1}},
    {s: {r: 27, c: 2}, e: {r: 27, c: 4}},
    {s: {r: 27, c: 5}, e: {r: 27, c: 13}},
    {s: {r: 28, c: 0}, e: {r: 28, c: 1}},
    {s: {r: 28, c: 2}, e: {r: 28, c: 4}},
    {s: {r: 28, c: 5}, e: {r: 28, c: 13}},
    {s: {r: 29, c: 0}, e: {r: 29, c: 1}},
    {s: {r: 29, c: 2}, e: {r: 29, c: 10}}
  ]
  // 单元格宽度
  let width = []
  // 单元格高度
  let height = []
  // 设置单元格属性
  Object.keys(workSheet).forEach((key) => {
    if (key.indexOf('!') < 0) {
      workSheet[key].s = {
        font: {
          name: '宋体',
          sz: 12
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center',
          wrapText: true
        }
      }
    }
    width.push({ wpx: 100 })
    height.push({ hpx: 20 })
  })
  workSheet['!cols'] = width
  workSheet['!rows'] = height
  console.log(workSheet)
  let workBook = XLSX.utils.book_new()
  // 把数据写到工作簿中
  XLSX.utils.book_append_sheet(workBook, workSheet, sheet)
  // 如果一个工作工作簿中有多个工作表，可以修改参数类型并遍历添加，期中workBook是同一个，workSheet和sheet根据自己的需求添加，
  // 比如在此处添加第二个工作表叫‘第二张表’，把数据封装好后，数据格式同上,假如数据叫workSheet2，执行下面代码，工作簿就会多一张工作表叫‘第二张表’
  // XLSX.utils.book_append_sheet(workBook,workSheet2,'第二张表')
  // 保存
  console.log(workBook)
  const wbout = xlsxStyle.write(workBook, {
    type: 'binary',
    bookType: 'xlsx'
  })
  xlsxSave.saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }), fileName + '.xlsx')
}

dataConversionUtil.examToExcel = function (fileName, tableHeader, dataList, sheet = fileName) {
  // excel的表头和数据
  let aoa = []
  // aoa的数据格式：[[],[],[],[]]   数组的第一个子数组可以指定为表头  根据情况而定
  aoa = tableHeader.concat(dataList)
  let workSheet = XLSX.utils.aoa_to_sheet(aoa)
  var question = JSON.parse(localStorage.getItem('question'))
  var aim = JSON.parse(localStorage.getItem('aim'))
  var totalRow = 0
  var quesNum = []
  for (let i = 0; i < question[1].length; i++) {
    quesNum[i] = parseInt(question[1][i].examNum)
    totalRow = totalRow + parseInt(question[1][i].examNum)
  }
  var quesLen = []
  for (let i = 0; i < quesNum.length; i++) {
    if (i === 0) {
      quesLen[i] = 1
    } else {
      quesLen[i] = quesLen[i - 1] + quesNum[i - 1]
    }
  }
  quesLen.push((quesLen[quesNum.length - 1] + quesNum[quesNum.length - 1]))
  var merge = []
  merge.push({s: {r: 0, c: 0}, e: {r: 0, c: (totalRow + 3)}})
  merge.push({s: {r: 1, c: 0}, e: {r: 2, c: 0}})
  merge.push({s: {r: 1, c: 2}, e: {r: 1, c: quesLen[1]}})
  merge.push({s: {r: 2, c: 2}, e: {r: 2, c: quesLen[1]}})
  for (let i = 1; i < quesLen.length; i++) {
    merge.push({s: {r: 1, c: (quesLen[i] + 1)}, e: {r: 1, c: quesLen[i + 1]}})
    merge.push({s: {r: 2, c: (quesLen[i] + 1)}, e: {r: 2, c: quesLen[i + 1]}})
  }
  merge.push({s: {r: 4, c: 0}, e: {r: (4 + aim[1].length), c: 0}})
  workSheet['!merges'] = merge
  // 单元格宽度
  let width = []
  // 单元格高度
  let height = []
  // 设置单元格属性
  Object.keys(workSheet).forEach((key) => {
    if (key.indexOf('!') < 0) {
      workSheet[key].s = {
        font: {
          name: '宋体',
          sz: 12
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center',
          wrapText: true
        }
      }
    }
    width.push({ wpx: 90 })
    height.push({ hpx: 20 })
  })
  workSheet['!cols'] = width
  workSheet['!rows'] = height
  console.log(workSheet)
  let workBook = XLSX.utils.book_new()
  // 把数据写到工作簿中
  XLSX.utils.book_append_sheet(workBook, workSheet, sheet)
  // 如果一个工作工作簿中有多个工作表，可以修改参数类型并遍历添加，期中workBook是同一个，workSheet和sheet根据自己的需求添加，
  // 比如在此处添加第二个工作表叫‘第二张表’，把数据封装好后，数据格式同上,假如数据叫workSheet2，执行下面代码，工作簿就会多一张工作表叫‘第二张表’
  // XLSX.utils.book_append_sheet(workBook,workSheet2,'第二张表')
  // 保存
  console.log(workBook)
  const wbout = xlsxStyle.write(workBook, {
    type: 'binary',
    bookType: 'xlsx'
  })
  xlsxSave.saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }), fileName + '.xlsx')
}

dataConversionUtil.workToExcel = function (items, tables) {
  let num = 0
  let workBook = XLSX.utils.book_new()
  items.forEach(item => {
    // excel的表头和数据
    let aoa = []
    // aoa的数据格式：[[],[],[],[]]   数组的第一个子数组可以指定为表头  根据情况而定
    var tableHeader = tables[num++]
    var dataList = tables[num++]
    aoa = tableHeader.concat(dataList)
    let workSheet = XLSX.utils.aoa_to_sheet(aoa)
    var work = JSON.parse(localStorage.getItem(item[0]))
    var totalRow = 0
    var workNum = []
    var workLen = []
    for (let i = 0; i < work[1].length; i++) {
      totalRow = totalRow + parseInt(work[0][i].length)
      workLen[i] = work[0][i].length
    }
    var index = 0
    for (let i = 0; i < work[0].length; i++) {
      for (let j = 0; j < work[0][i].length; j++) {
        workNum[index++] = parseInt(work[0][i][j])
      }
    }
    var itemLen = [] // 每一个作业的终点
    for (let i = 0; i < work[1].length; i++) {
      if (i === 0) {
        itemLen[i] = 1
      } else {
        itemLen[i] = itemLen[i - 1] + workLen[i - 1]
      }
    }
    itemLen.push((itemLen[workLen.length - 1] + workLen[workLen.length - 1]))
    var merge = []
    merge.push({s: {r: 0, c: 0}, e: {r: 0, c: (totalRow + 2)}})
    merge.push({s: {r: 1, c: 2}, e: {r: 1, c: itemLen[1]}})
    for (let i = 1; i < itemLen.length; i++) {
      merge.push({s: {r: 1, c: (itemLen[i] + 1)}, e: {r: 1, c: itemLen[i + 1]}})
    }
    workSheet['!merges'] = merge
    // 单元格宽度
    let width = []
    // 单元格高度
    let height = []
    // 设置单元格属性
    Object.keys(workSheet).forEach((key) => {
      if (key.indexOf('!') < 0) {
        workSheet[key].s = {
          font: {
            name: '宋体',
            sz: 12
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center',
            wrapText: true
          }
        }
      }
      width.push({ wpx: 90 })
      height.push({ hpx: 20 })
    })
    workSheet['!cols'] = width
    workSheet['!rows'] = height
    // 把数据写到工作簿中
    XLSX.utils.book_append_sheet(workBook, workSheet, item[1])
  })
  // 如果一个工作工作簿中有多个工作表，可以修改参数类型并遍历添加，期中workBook是同一个，workSheet和sheet根据自己的需求添加，
  // 比如在此处添加第二个工作表叫‘第二张表’，把数据封装好后，数据格式同上,假如数据叫workSheet2，执行下面代码，工作簿就会多一张工作表叫‘第二张表’
  // XLSX.utils.book_append_sheet(workBook,workSheet2,'第二张表')
  // 保存
  const wbout = xlsxStyle.write(workBook, {
    type: 'binary',
    bookType: 'xlsx'
  })
  xlsxSave.saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }), '成绩表' + '.xlsx')
}

function s2ab (s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

export { dataConversionUtil }

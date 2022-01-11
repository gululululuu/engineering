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

function s2ab (s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}
export { dataConversionUtil }
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-card class="box-card">
        <el-descriptions title="注意事项" :column="1">
          <el-descriptions-item label="操作系统要求">
            1.Windows 7 32/64位 &nbsp; &nbsp; 2.Windows 8.1 32/64位&nbsp; &nbsp;
            3. Windows 10 32/64位
          </el-descriptions-item>
          <el-descriptions-item label="浏览器要求">
            1. IE11 &nbsp; &nbsp; 2.Chrome49-74版本。建议使用Chrome 58以上版本。
          </el-descriptions-item>
          <el-descriptions-item label="其他">
            1. 刷新浏览器会导致账号被签出 &nbsp; &nbsp;
            2.频繁刷新会造成媒体服务msp连接异常 &nbsp; &nbsp;
            3.MSP媒体服务依赖于C++运行库，请确保运行机器上安装有vc2015运行库。
          </el-descriptions-item>
          <el-descriptions-item label="下载资源">
            <el-button type="primary" @click="download">
            下载
            </el-button>
          </el-descriptions-item>
        </el-descriptions>

      </el-card>
    </div>
  </div>
</template>

<script setup name="dashboard">
const download = () => {
  const iframe = document.createElement('iframe');
  iframe.src = '/MSP.zip';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
}
</script>

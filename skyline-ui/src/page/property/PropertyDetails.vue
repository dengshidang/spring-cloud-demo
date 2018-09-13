<template>
  <!--个人中心-->
  <div class="son-container">
    <Navigation :index="0"></Navigation>
    <div class="personal-wrapper">
      <h4 class="personal-tit">资产明细</h4>
      <div class="asset-box bg-f1">
        <!--筛选-->
        <div class="asset-sel">
          <div class="asset-sel-item">

            <Input type="text" v-model="params.coinName" placeholder="搜索币种"></Input>
          </div>
          <div class="asset-sel-item">
            <div class="w-100">
              <Select v-model="params.categroy" placeholder="类型" class="w-100">
                <Option value="-1" >全部</Option>
                <Option value="0" >充值</Option>
                <Option value="1" >转账</Option>
              </Select>
            </div>
          </div>
          <div class="asset-sel-item">
            <div class="w-100">
              <Select v-model="params.status" placeholder="状态" class="w-100">
                <Option value="-1" >全部</Option>
                <Option value="0" >待审核</Option>
                <Option value="1" >审核成功</Option>
                <Option value="2" >审核失败</Option>
                <Option value="3" >充值退回</Option>
                <Option value="4" >异常打款</Option>
              </Select>
            </div>
          </div>
          <a href="javascript:void(0);" class="search-btn"></a>
          <div class="clearfix"></div>
        </div>
        <div class="asset-tab">
          <div class="asset-tab-top">
            <span class="asset-tab-option">类型</span>
            <span class="asset-tab-option">币种</span>
            <span class="asset-tab-option">时间</span>
            <span class="asset-tab-option">数量</span>
            <span class="asset-tab-option">状态</span>
            <div class="clearfix"></div>
          </div>
          <div class="asset-tab-main home-scroll">
            <div class="asset-tab-row" v-for="item in list">
              <div class="asset-tab-option">{{item.categroy==0 ? '充值':'提现'}}</div>
              <div class="asset-tab-option">
                <img src="../../assets/img/icon-coin1.png" class="asset-icon">
                <span class="asset-name">{{item.coinName}}</span>
                <div class="clearfix"></div>
              </div>
              <div class="asset-tab-option">{{item.updateTime}}</div>
              <div class="asset-tab-option">{{item.amount}}</div>
              <div class="asset-tab-option">
                <template v-if="item.status==0">
                  待审核
                </template>
                <template v-else-if="item.status==1">
                  审核成功
                </template>
                <template v-else-if="item.status==2">
                  审核失败
                </template>
                <template v-else-if="item.status==3">
                  充值退回
                </template>
                <template v-else-if="item.status==4">
                  异常打款
                </template>
              </div>
              <div class="clearfix"></div>
            </div>

          </div>
          <div style="margin: 10px;height: 45px" >
            <Page  style="float: right" :total="total"  :current="params.pageNum" :page-size="params.pageSize" @on-change="setPageNum" />
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import {Input,Select,Option,Page} from 'iview'
  import Navigation from "../comm/Navigation"
    export default {
        name: "PropertyDetails",
        components:{Navigation,Input,Select,Option,Page},
        data(){
          return {
            list:[],
            total:0,
            params:{
              pageNum:1,
              pageSize:10,
              status:null,
              categroy:null,
              coinName:null,

            }
          }
        },
        watch:{
          'params.status'(val){
            if(val==-1){
              this.params.status=null;
            }
            this.getList();
          },
          'params.categroy'(val){
            if(val==-1){
              this.params.categroy=null;
            }
            this.getList();
          },
          'params.coinName'(val){
            if(val==''){
              this.params.coinName=null;
            }
            this.getList();
          }
        },
        methods:{
          setPageNum(val){
            this.params.pageNum=val;
            this.getList();
          },
          getList(){
            this.$Http.post('/wallet/record',this.params).then(resp=>{
                this.list=resp.data.result.list;
                this.total=resp.data.result.total;
            });
          }
        },
        mounted(){
          this.getList();
        }
    }
</script>

<style scoped>
  @import "../../assets/css/user.css";
</style>

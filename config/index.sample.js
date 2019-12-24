const URLHASH = {
  mock: 'rap2api.taobao.org/app/mock/163112',
  dev: 'esb.sooc.com',                        //开发接口域名
  test: 'mp.esb.sooc.com',                    //测试接口域名
  pre: 'ttesbmp.soocedu.com',                 //预上线接口域名
  master: 'esbmp.soocedu.com'                 //正式接口域名
};

export const api = 'http://'+URLHASH.mock;
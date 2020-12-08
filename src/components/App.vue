<template>
  <Page actionBarHidden="true">
    <ActionBar title="Welcome to NativeScript-Vue" />
    <GridLayout>
      <WebView @loaded="webViewLoaded" @loadFinished="applyCss" :src="url" />
      <Label row="1" :text="msg" textWrap="true" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import { WebView } from "@nativescript/core";
import { WebViewUtils } from "nativescript-webview-utils";
import * as observable from "@nativescript/core/data/observable";
import { loadCss, injectCss } from "../services/injection.service";

export default {
  data() {
    return {
      msg: "",
      webView: null,
      url: "https://www.facebook.com/messages/t/?cquick=jsc_c_n&cquick_token=AQ5TbQf0OBhFLQqdM5s&ctarget=https%3A%2F%2Fwww.facebook.com",
      prevUrl: "",
    };
  },
  created() {},
  methods: {
    webViewLoaded(args: observable.EventData) {
      const wv: WebView = <WebView>args.object;
      this.webView = wv;
      const headers: Map<string, string> = new Map();
      headers.set(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
      );
      WebViewUtils.addHeaders(wv, headers);
    },
    applyCss(args: observable.EventData) {
      const wv = this.webView;
      setInterval(() => {
        const newUrl = wv.android.getUrl();
        if (newUrl !== this.prevUrl) {
          this.prevUrl = newUrl;
          injectCss(wv);
        }
      }, 2000);
    },
  },
};
</script>

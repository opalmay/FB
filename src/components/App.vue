<template>
  <Page actionBarHidden="true">
    <ActionBar title="Welcome to NativeScript-Vue"
      ><NavigationButton
        text="Go back"
        android.systemIcon="ic_menu_back"
        @tap="goBack"
    /></ActionBar>
    <GridLayout>
      <WebView @loaded="webViewLoaded" @loadFinished="applyCss" :src="url" />
      <Label row="1" :text="msg" textWrap="true" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import {
  WebView,
  AndroidApplication,
  AndroidActivityBackPressedEventData,
} from "@nativescript/core";
import { WebViewUtils } from "nativescript-webview-utils";
import * as observable from "@nativescript/core/data/observable";
import { loadCss, inject } from "../services/injection.service";
import * as application from "@nativescript/core/application";

export default {
  data() {
    return {
      msg: "",
      webView: null,
      //this is a magical url from an iframe inside an iframe on messenger and using it directly prevents redirects. no idea why
      url:
        "https://www.facebook.com/messages/t/?cquick=jsc_c_n&cquick_token=AQ5TbQf0OBhFLQqdM5s&ctarget=https%3A%2F%2Fwww.facebook.com",
      prevUrl: "",
    };
  },
  created() {
    if (application.android) {
      application.android.on(
        AndroidApplication.activityBackPressedEvent,
        (data: AndroidActivityBackPressedEventData) => {
          data.cancel = true;
          if (this.webView.canGoBack) {
            if(this.webView.android.getUrl() !== "https://www.facebook.com/"){
            this.prevUrl = this.webView.android.getUrl();
            this.webView.goBack();
            }
          }
        }
      );
    }
  },
  methods: {
    webViewLoaded(args: observable.EventData) {
      const wv: WebView = <WebView>args.object;
      this.webView = wv;
      const headers: Map<string, string> = new Map();
      headers.set(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
      );
      WebViewUtils.addHeaders(wv, headers);
    },
    applyCss(args: observable.EventData) {
      const wv = this.webView;
      // going to the url above and then to fb is the only way ive found to prevent redirection to the mobile site
      wv.src = "https://www.facebook.com";
      setTimeout(() => {
        if (!wv.android) return;
        const newUrl: string = wv.android.getUrl();
        if (newUrl !== this.prevUrl) {
          this.prevUrl = newUrl;
          inject(wv, newUrl.includes("messages"));
        }
      }, 5000);
    },
  },
};
</script>

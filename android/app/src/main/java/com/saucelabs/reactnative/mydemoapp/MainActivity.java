package com.saucelabs.mydemoapp.rn;
import expo.modules.ReactActivityDelegateWrapper;
import com.facebook.react.ReactActivity;
// For bootsplash
import com.facebook.react.ReactActivityDelegate;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MyDemoApp";
  }

  /**
   * For RNBootSplash
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this);
        super.loadApp(appKey);
      }
    });
  }
}

package com.treebohotels; 

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SumModule extends ReactContextBaseJavaModule {
    public SumModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SumModule";
    }

    @ReactMethod
    public int sum(int a, int b) {
        return a + b;
    }
}

package com.rnassessment;
import android.Manifest;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.net.wifi.WifiManager;
import android.os.Environment;
import android.text.format.Formatter;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import android.os.Build;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;


import static android.content.Context.WIFI_SERVICE;

public class screenshot extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    screenshot(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }
    @Override
    public String getName() {
        return "screenshot";
    }

    @ReactMethod
    public void captureScreen(Callback success) {
        WifiManager wifiManager = (WifiManager)reactContext.getApplicationContext().getSystemService(WIFI_SERVICE);
        String ipAddress = Formatter.formatIpAddress(wifiManager.getConnectionInfo().getIpAddress());

             String imageData = Screenshot();

        if (Build.VERSION.SDK_INT >= 23) {
            int permissionCheck = ContextCompat.checkSelfPermission(reactContext, Manifest.permission.WRITE_EXTERNAL_STORAGE);
            int permissionReadCheck = ContextCompat.checkSelfPermission(reactContext, Manifest.permission.READ_EXTERNAL_STORAGE);
            if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
            }
            if (permissionReadCheck != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 1);
            }


        }

        WritableMap map = new WritableNativeMap();
        map.putString("BRAND",Build.BOARD);
        map.putString("HARDWARE",Build.HARDWARE);
        map.putString("DEVICE",Build.DEVICE);
        map.putString("HOST",Build.HOST);
        map.putString("MANUFACTURER",Build.MANUFACTURER);
        map.putString("MODEL",Build.MODEL);
        map.putString("PRODUCT",Build.PRODUCT);
        map.putString("IPAddress",ipAddress);
        map.putString("ScreenShots",imageData);
        success.invoke(map);
    }

    public String Screenshot() {
        Date now = new Date();
        android.text.format.DateFormat.format("yyyy-MM-dd", now);

        try {
            // image naming and path  to include sd card  appending name you choose for file
            String mPath = Environment.getExternalStorageDirectory().toString() + "/" + now + ".jpg";

            // create bitmap screen capture
            View v1 = getCurrentActivity().getWindow().getDecorView().getRootView();
            v1.setDrawingCacheEnabled(true);
            Bitmap bitmap = Bitmap.createBitmap(v1.getDrawingCache());
            v1.setDrawingCacheEnabled(false);

            File imageFile = new File(mPath);
            System.out.println("image data="+imageFile);

            FileOutputStream outputStream = new FileOutputStream(imageFile);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            int quality = 100;
            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream);
            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, byteArrayOutputStream);
            byte[] byteArray = byteArrayOutputStream .toByteArray();
            String imageData = Base64.encodeToString(byteArray, Base64.DEFAULT);
            outputStream.flush();
            outputStream.close();
            byteArrayOutputStream.flush();
            byteArrayOutputStream.close();


            Log.d("imageData", imageData);
            return imageData;
        } catch (Throwable e) {
            System.out.println("exception=>"+e.fillInStackTrace());
            // Several error may come out with file handling or DOM
            e.printStackTrace();
            return new String();
        }
    }



}






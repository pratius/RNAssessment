//
//  screenshot.m
//  RNAssessment
//
//  Created by pratius Dubey on 05/10/20.
//

// screenshot.m
#import "screenshot.h"
#import <React/RCTLog.h>
#include <ifaddrs.h>
#include <arpa/inet.h>
@implementation screenshot


// To export a module named screenshot
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(captureScreen:(RCTResponseSenderBlock)callback)
{
  NSString *strScreenData = [self captureScreen];
  NSMutableDictionary *mDict;
  mDict = [NSMutableDictionary dictionary];
  [mDict setObject: [[[UIDevice currentDevice] identifierForVendor] UUIDString] forKey: @"Identifier"];
  [mDict setObject: [[UIDevice currentDevice] name] forKey: @"DeviceName"];
  [mDict setObject: [[UIDevice currentDevice] systemName] forKey: @"OSName"];
  [mDict setObject:[[UIDevice currentDevice] systemVersion] forKey: @"OSVersion"];
  [mDict setObject:[[UIDevice currentDevice] model] forKey: @"DeviceModel"];
  [mDict setObject:strScreenData forKey: @"ScreenCapture"];
  
  callback(@[mDict]);
  
}
- (NSString *)getIPAddress {
  
  NSString *address = @"error";
  struct ifaddrs *interfaces = NULL;
  struct ifaddrs *temp_addr = NULL;
  int success = 0;
  success = getifaddrs(&interfaces);
  if (success == 0) {
    temp_addr = interfaces;
    while(temp_addr != NULL) {
      if(temp_addr->ifa_addr->sa_family == AF_INET) {
        if([[NSString stringWithUTF8String:temp_addr->ifa_name] isEqualToString:@"en0"]) {
          address = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];
          
        }
        
      }
      
      temp_addr = temp_addr->ifa_next;
    }
  }
  // Free memory
  freeifaddrs(interfaces);
  return address;
  
}

- (NSString *) captureScreen {
  
  @try {
    
    UIWindow *keyWindow = [[UIApplication sharedApplication] keyWindow];
    CGRect rect = [keyWindow bounds];
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    [keyWindow.layer renderInContext:context];
    UIImage *img = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    // save screenshots to Camera Roll
    UIImageWriteToSavedPhotosAlbum(img, nil, nil, nil);
    NSData *imageData = UIImagePNGRepresentation(img);
    NSString * base64String = [imageData base64EncodedStringWithOptions:0];
    return base64String;
  } @catch (NSException *exception) {
    NSLog(@"%@", exception.reason);
    return nil;
  }
  
}
@end

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

// Disabled for expo unimodules
//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

// Added for expo unimodules
#import <UMCore/UMAppDelegateWrapper.h>
@interface AppDelegate : UMAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end

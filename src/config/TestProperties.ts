import {IS_IOS} from '../utils/Constants';

export function testProperties(id: string, disableAccessible = false) {
  // All touchable elements are accessible
  // meaning that it groups its children into a single selectable component
  // sometimes this is not needed for testing
  const disableAccessibility = disableAccessible ? {accessible: false} : {};

  if (IS_IOS) {
    return {...disableAccessibility, testID: id};
  }

  return {...disableAccessibility, accessibilityLabel: id};
}

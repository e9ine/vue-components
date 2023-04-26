import AvatarExample from '@/app/components/AvatarExample.vue';
import AvatarInfoExample from '@/app/components/AvatarInfoExample.vue';
import AvatarGroupExample from '@/app/components/AvatarGroupExample.vue';
import BadgeExample from '@/app/components/BadgeExample.vue';
import BreadcrumbsExample from '@/app/components/BreadcrumbsExample.vue';
import BreadcrumbsLevel1 from '@/app/components/BreadcrumbsLevel1.vue';
import BreadcrumbsLevel2 from '@/app/components/BreadcrumbsLevel2.vue';
import ButtonExample from '@/app/components/ButtonExample.vue';
import CardExample from '@/app/components/CardExample.vue';
import CardCustomMediaExample from '@/app/components/CardCustomMediaExample.vue';
import CardCustomSlotExample from '@/app/components/CardCustomSlotExample.vue';
import CardExpandedSlotExample from '@/app/components/CardExpandedSlotExample.vue';
import ColorPickerExample from '@/app/components/ColorPickerExample.vue';
import ChipsExample from '@/app/components/ChipsExample.vue';
import ProgressBarExample from '@/app/components/ProgressBarExample.vue';
import StepperExample from '@/app/components/StepperExample.vue';
import TabsExample from '@/app/components/TabsExample.vue';
import ChartExample from '@/app/components/ChartExample.vue';
import TableExample from '@/app/components/TableExample.vue';
import PanelExample from '@/app/components/PanelExample.vue';
import RangeExample from '@/app/components/RangeExample.vue';
import TooltipExample from '@/app/components/TooltipExample.vue';
import OverlaysExample from '@/app/components/OverlaysExample.vue';
import AddressFinderExample from '@/app/components/AddressFinderExample.vue';
import ShimmerExample from '@/app/components/ShimmerExample.vue';
import CalendarExample from '@/app/components/CalendarExample.vue';
import SelectionIndicators from '@/app/components/SelectionIndicators.vue';
import TimepickerExample from '@/app/components/TimepickerExample.vue';
import ModalExample from '@/app/components/ModalExample.vue';

export const routes = [
    {
        path: '/avatar',
        name: 'Avatar',
        component: AvatarExample
    },
    {
        path: '/avatar-info',
        name: 'Avatar Info',
        component: AvatarInfoExample
    },
    {
        path: '/avatar-group',
        name: 'Avatar Group',
        component: AvatarGroupExample
    },
    {
        path: '/badge',
        name: 'Badge',
        component: BadgeExample
    },
    {
        path: '/breadcrumbs',
        name: 'BreadCrumbs',
        component: BreadcrumbsExample,
        children: [
            {
                path: 'level-1',
                name: 'Level 1',
                component: BreadcrumbsLevel1,
                children: [
                    {
                        path: 'level-2',
                        name: 'Level 2',
                        component: BreadcrumbsLevel2
                    }
                ]
            }
        ]
    },
    {
        path: '/buttons',
        name: 'Buttons',
        component: ButtonExample
    },
    {
        path: '/card',
        name: 'Card',
        component: CardExample
    },
    {
        path: '/card-custom-media',
        name: 'CardCustomMediaExample',
        component: CardCustomMediaExample
    },
    {
        path: '/card-custom-slot',
        name: 'CardCustomSlotExample',
        component: CardCustomSlotExample
    },
    {
        path: '/card-expanded-slot',
        name: 'CardExpandedSlotExample',
        component: CardExpandedSlotExample
    },
    {
        path: '/color-picker',
        name: 'Color Picker',
        component: ColorPickerExample
    },
    {
        path: '/chips',
        name: 'Chips',
        component: ChipsExample
    },
    {
        path: '/progress-bar',
        name: 'Progress Bar',
        component: ProgressBarExample
    },
    {
        path: '/stepper',
        name: 'Stepper',
        component: StepperExample
    },
    {
        path: '/tabs',
        name: 'Tabs',
        component: TabsExample
    },
    {
        path: '/charts',
        name: 'Charts',
        component: ChartExample
    },
    {
        path: '/table',
        name: 'Table',
        component: TableExample
    },
    {
        path: '/panel',
        name: 'Panel',
        component: PanelExample
    },
    {
        path: '/range',
        name: 'Range',
        component: RangeExample
    },
    {
        path: '/tooltip',
        name: 'Tooltip',
        component: TooltipExample
    },
    {
        path: '/overlays',
        name: 'Overlays',
        component: OverlaysExample
    },
    {
        path: '/address-finders/google-address-finder',
        name: 'Address Finder',
        component: AddressFinderExample
    },
    {
        path: '/shimmer',
        name: 'Shimmer',
        component: ShimmerExample
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: CalendarExample
    },
    {
        path: '/selection-indicators',
        name: 'Selection Indicators',
        component: SelectionIndicators
    },
    {
        path: '/timepicker',
        name: 'Timepicker',
        component: TimepickerExample
    },
    {
        path: '/modal',
        name: 'Modal',
        component: ModalExample
    }
];

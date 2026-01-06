import spriteUrl from '@/shared/assets/icons-sprite-shared.svg'
import {Label} from '@/shared/ui/label'

type Props = {
    name: 'white-house' | 'white-plus'
    size?: number
}

export function PublicIcon({ name, size = 24 }: Props) {
    return (
        <svg width={size} height={size} fill="currentColor">
            <use href={`/icons-sprite.svg#${name}`} />
        </svg>
    )
}



type SharedIconProps = {
    name: 'white-people' | 'white-bookmark'
    size?: number
}
export function SharedIcon({ name, size = 24 }: SharedIconProps) {
    console.log(JSON.stringify(spriteUrl, null, 2));
    return (
        <div><Label />
        <svg width={size} height={size} fill="currentColor">
            <use href={`${spriteUrl.src}#${name}`} />
        </svg>
        </div>
    )
}
export declare namespace WechatType {
    type Event = "subscribe" | "unsubscribe" | "SCAN";
    interface UserInfo {
        subscribe: number;
        openid: string;
        language: string;
        subscribe_time: number;
        unionid?: string;
        remark: string;
        groupid: number;
        tagid_list: number[];
        subscribe_scene: string;
        qr_scene: number;
        qr_scene_str: string;
    }
}
//# sourceMappingURL=wechat.d.ts.map
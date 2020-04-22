character

常驻属性
PT // point
HP // heath point
DEF // defense

条件属性
ES // energy shield
ATN // attack

隐藏属性
SPD // speed

暂时没有的属性
RES // 魔法防御

card = compose card

base card
PT // 需要消耗的点数
target // 目标数量 0/1
range // 0/1/2

act card
ATN // 物理攻击力
INT // 魔法攻击力
STP // step +-
defer // 延时伤害（回合数）

buff card
ATN // 反击伤害
DEF // 物理防御
SPD // 速度
buff // 0/1
duration // 持续时间（回合数）

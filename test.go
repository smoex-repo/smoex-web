package main

import "fmt"

type Temp struct {
	id int64
	name []int64
}

func main() {
	ids := []int64{ 1, 2, 3, 4 }
	names := make(map[int64][]int64)
	names[1] = []int64 {1, 3}
	names[3] = []int64 {2, 4}
	res := make(map[int64]*Temp)
	for _, id := range ids {
		temp := &Temp{
			id: id,
		}
		if info, ok := names[temp.id]; ok {
			temp.name = info
		}
		res[id] = temp
	}
	fmt.Println("123465", res[1])
}

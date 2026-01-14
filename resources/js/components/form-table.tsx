import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormTable() {
  return (
    <Table>
      {/* Phần Header chứa các Label */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Tên Khách Hàng</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="w-[180px]">Trạng Thái</TableHead>
        </TableRow>
      </TableHeader>

      {/* Phần Body chứa các Input/Select */}
      <TableBody>
        {/* Dòng 1 */}
        <TableRow>
          <TableCell>
            <Input placeholder="Nguyễn Văn A" />
          </TableCell>
          <TableCell>
            <Input type="email" placeholder="nguyenvana@example.com" />
          </TableCell>
          <TableCell>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
        </TableRow>

        {/* Dòng 2 */}
        <TableRow>
          <TableCell>
            <Input placeholder="Trần Thị B" />
          </TableCell>
          <TableCell>
            <Input type="email" placeholder="tranthib@example.com" />
          </TableCell>
          <TableCell>
            <Select defaultValue="inactive">
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
